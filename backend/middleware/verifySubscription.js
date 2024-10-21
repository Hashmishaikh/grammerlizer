import Subscription from "../model/subscription.model.js";

const verifySubscription = async (req, res, next) => {
    // console.log('reqfor subscription', req)
    try {
      const userId = req.user._id;
      const subscription = await Subscription.findOne({ userId: userId });
  
      if (!subscription || subscription.paymentStatus !== 'active') {
        return res.status(403).json({ message: 'Subscription required for this action' });
      }
      req.subscription = subscription;
      next();
    } catch (err) {
        console.log('error in verifySubscription middleware', err)
      res.status(500).json({ message: 'Error checking subscription' });
    }
  };

  export default verifySubscription;