import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
// import verifySubscription from "./verifySubscription.js";
// import Subscription from "../model/subscription.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Unauthorized - no token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(401).json({ error: "Unauthorized - invalid token" });
    }
    const user = await User.findById(decode.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("error in protected route middleware", error.message);
    if(error.message == "jwt expired"){
      return res.status(401).json({ error: "Token Expired - your token has been expired" });
    }

    if(error.message == "invalid signature"){
      return res.status(401).json({ error: "Unauthorized - invalid token" });
    }
    res.status(500).json({ error: "Internal Server Error" });
    
  }
};

// const protectRoute = async (req, res, next) => {
//   try {
//     const token = req.cookies.jwt;
//     if (!token) {
//       return res
//         .status(401)
//         .json({ error: "Unauthorized - no token provided" });
//     }
//     const decode = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decode) {
//       return res
//         .status(401)
//         .json({ error: "Unauthorized - no token provided" });
//     }
//     const user = await User.findById(decode.userId).select("-password");

//     if (!user) {
//       return res.status(404).json({
//         error: "User not found",
//       });
//     }

//     req.user = user;

//     next();
//   } catch (error) {
//     console.log("error in protected route middleware", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export default protectRoute;
