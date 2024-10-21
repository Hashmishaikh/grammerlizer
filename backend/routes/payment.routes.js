import express from "express";
import { addSubscription, cancelSubscription, getPaymentData } from "../controller/stripe.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// payment routes
router.post("/payment", protectRoute, addSubscription);
router.post("/payment-cancel", protectRoute, cancelSubscription);
router.get("/get-payment", protectRoute, getPaymentData);

export default router;