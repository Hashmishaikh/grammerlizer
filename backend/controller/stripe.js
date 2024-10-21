import Stripe from "stripe";
import Subscription from "../model/subscription.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

function calculateEndDate(plan) {
  const today = new Date(); // Get the current date

  switch (plan) {
    case "free":
      // Define free plan duration (e.g., no expiration)
      return null; // Return null for a plan with no expiration
    case "basic":
      // Add one month to the current date
      return new Date(today.setMonth(today.getMonth() + 1)); // Add 1 month
    case "yearly":
      // Add one year to the current date
      return new Date(today.setFullYear(today.getFullYear() + 1)); // Add 1 year
    default:
      // Throw an error for unknown plans
      throw new Error(`Invalid subscription plan: ${plan}`);
  }
}

// create te subscription function
const createStripeCustomer = async (userId, token, userEmail) => {
  try {
    const customer = await stripe.customers.create({
      source: token,
      email: userEmail, // Retrieve user email for Stripe customer creation
    });
    return customer;
  } catch (err) {
    console.error("Error creating Stripe customer:", err.message);
    throw err; // Re-throw error for handling in the route handler
  }
};

// create the subscription function
const createSubscription = async (req, userId, planId) => {
  try {
    const customer = await createStripeCustomer(
      userId,
      req.body.stripeToken,
      req.user.email
    ); // Assuming token in request body

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: "subscription",
      line_items: [
        {
          price:
            planId === "basic"
              ? process.env.STRIPE_PRICE_ID
              : process.env.STRIPE_PRICE_ID_YEARLY,
          quantity: 1,
        },
      ],
      success_url: "https://grammartoolweb.onrender.com",
    });
    return session;
  } catch (err) {
    console.error("Error creating Stripe subscription:", err.message);
    throw err; // Re-throw error for handling in the route handler
  }
};

// regenerate the payment link
const regeneratePaymentLink = async (req, res, planId) => {
  console.log("regenerate link");
  try {
    const userId = req.user._id;
    const subscribeUser = await Subscription.findOne({ userId: userId });

    if (subscribeUser) {
      const session = await stripe.checkout.sessions.create({
        customer: subscribeUser.customerId, // Assuming you store Stripe customer ID
        mode: "subscription",
        line_items: [
          {
            price:
              planId === "basic"
                ? process.env.STRIPE_PRICE_ID
                : process.env.STRIPE_PRICE_ID_YEARLY,
            quantity: 1,
          },
        ],
        success_url: "https://grammartoolweb.onrender.com",
      });
      // console.log("res.json", session);
      return session;
    } else {
      res.status(400).json({ error: "User is not registered" });
    }
  } catch (err) {
    console.error("Error regenerating payment link:", err.message);
    // res.status(500).json({ error: "Internal server error" });
    throw err;
  }
};

// add the subscription api function
export const addSubscription = async (req, res) => {
  // console.log('req', req)
  try {
    const userId = req.user._id; // Extract user ID from protected middleware
    const plan = req.body.plan; // Extract chosen plan from request body

    if (!plan) {
      return res
        .status(400)
        .json({ error: "Please select a subscription plan" });
    }

    const subscribeUser = await Subscription.findOne({ userId: userId });

    if (!subscribeUser) {
      const subscription = await Subscription.create({
        userId: userId,
        subscriptionPlan: plan,
        endDate: calculateEndDate(plan), // Calculate end date based on plan details
      });
      const stripeSubscription = await createSubscription(req, userId, plan); // Create Stripe subscription
      console.log("stripeSubscruption", stripeSubscription);
      subscription.customerId = stripeSubscription.customer;
      subscription.paymentId = stripeSubscription.id; // Store Stripe payment ID (optional)
      await subscription.save();
      res.json({ data: stripeSubscription.url });
    } else {
      const regeneratePayment = await regeneratePaymentLink(req, res, plan);
      subscribeUser.subscriptionPlan = plan;
      subscribeUser.customerId = regeneratePayment.customer;
      subscribeUser.paymentId = regeneratePayment.id;
      await subscribeUser.save();
      res.json({ data: regeneratePayment.url });
      // res.json({ data: "already register please do the payment" });
    }
  } catch (err) {
    console.error("Error adding subscription:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// update the subscription status
export const updateSubscriptionStatus = async (session) => {
  // console.log("session", session);
  try {
    const subscription = await Subscription.findOne({ paymentId: session.id });
    if (subscription) {
      subscription.paymentStatus = "active";
      subscription.stripeSubscriptionId = session.subscription;
      // console.log("insUBSCRIPTION");
      await subscription.save();
    }
    // console.log("NOT IN SUBSCRIPTION");
  } catch (err) {
    console.error("Error updating subscription status:", err.message);
  }
};

// cancel subscription api
export const cancelSubscription = async (req, res) => {
  try {
    const userId = req.user._id;

    const subscription = await Subscription.findOne({ userId: userId });
    if (!subscription) {
      return res.status(400).json({ error: "Subscription not found" });
    }

    // Cancel the Stripe subscription
    await stripe.subscriptions.cancel(subscription.stripeSubscriptionId);

    // Update the subscription status in the database
    subscription.paymentStatus = "canceled";
    await subscription.save();

    res.json({ message: "Subscription canceled successfully" });
  } catch (err) {
    console.error("Error canceling subscription:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


// get payment data

export const getPaymentData = async (req,res) => {
  const userId = req.user._id;
  try{
    const payments = await Subscription.findOne({userId: userId});
    if (!payments) {
      return res.status(400).json({ error: "Subscription not found" });
    }
    res.status(200).json(payments);
  }catch(err){
    console.log('err', err)
    if(err){
      return res.status(500).json({error:err.Error})
    }
    // res.status(500).json({ error: "Internal server error" });
  }
}
