import express from "express";
import Stripe from "stripe";
import { updateSubscriptionStatus } from "../controller/stripe.js"; // Assuming you have a controller file for handling subscription logic

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handleCompletePayment = express.Router();

handleCompletePayment.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        // Then define and call a function to handle the event checkout.session.completed
        await updateSubscriptionStatus(session);
        break;
      // Handle other event types if needed
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).json({ received: true });
  }
);

export default handleCompletePayment;
