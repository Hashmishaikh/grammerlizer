import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Reference to the User model
  },
  subscriptionPlan: {
    type: String,
    required: true,
    enum: ['basic', 'yearly'], // Example subscription plans
    default: 'basic'
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now // Set to current date on creation
  },
  endDate: {
    type: Date,
    // required: true
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ['active', 'inactive','canceled'],
    default: 'inactive'
  },
  paymentId: { // Store Stripe payment ID (optional)
    type: String
  },
  customerId:{  //Store Stripe customer ID
    type: String
  },
  stripeSubscriptionId:{
    type: String
  }
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

export default Subscription;