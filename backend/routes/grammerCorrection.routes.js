import express from "express";
import {
  broader,
  deleteGrammerData,
  getGrammerData,
  getGrammerDataById,
  narrow,
  normal,
  postGrammerData,
  professional,
  rephrase,
  synony,
  updateGrammerData,
} from "../controller/grammerCorrection.js";
import protectRoute from "../middleware/protectRoute.js";
import verifySubscription from "../middleware/verifySubscription.js";

const router = express.Router();

router.post("/rephrase", protectRoute, verifySubscription, rephrase);
router.post("/normal", protectRoute,verifySubscription, normal);
router.post("/professional", protectRoute,verifySubscription, professional);
router.post("/narrow", protectRoute, verifySubscription, narrow);
router.post("/broader", protectRoute,verifySubscription, broader);
router.post("/synony", protectRoute,verifySubscription, synony);
router.post("/grammer", protectRoute, verifySubscription, postGrammerData);
router.get("/grammer", protectRoute, verifySubscription, getGrammerData);
router.get("/grammer/:grammerId", protectRoute,verifySubscription, getGrammerDataById);
router.delete("/delete-grammer/:grammerId", protectRoute,verifySubscription, deleteGrammerData);
router.put("/update-grammer/:grammerId", protectRoute,verifySubscription, updateGrammerData);

export default router;
