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
// import verifySubscription from "../middleware/verifySubscription.js";

const router = express.Router();

router.post("/rephrase", protectRoute, rephrase);
router.post("/normal", protectRoute, normal);
router.post("/professional", protectRoute, professional);
router.post("/narrow", protectRoute, narrow);
router.post("/broader", protectRoute, broader);
router.post("/synony", protectRoute, synony);
router.post("/grammer", protectRoute, postGrammerData);
router.get("/grammer", protectRoute, getGrammerData);
router.get("/grammer/:grammerId", protectRoute, getGrammerDataById);
router.delete("/delete-grammer/:grammerId", protectRoute, deleteGrammerData);
router.put("/update-grammer/:grammerId", protectRoute, updateGrammerData);

export default router;
