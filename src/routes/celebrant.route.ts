import express from "express";
import { authenticateApiKey } from "../middlewares/index";
import {
  allCelebrants,
  createCelebrant,
  deleteCelebrant,
  getACelebrant,
  getCelebrantBirthdayWish,
  postWishes,
  updateCelebrant,
} from "../controllers/index";

const router = express.Router();

router.post("/", authenticateApiKey, createCelebrant);
router.get("/", authenticateApiKey, allCelebrants);
router.get("/:id", authenticateApiKey, getACelebrant);
router.patch("/:id", authenticateApiKey, updateCelebrant);
router.delete("/:id", authenticateApiKey, deleteCelebrant);
router.post("/birthday-wish", authenticateApiKey, postWishes);
router.get(
  "/birthday-wish/:celebrantId",
  authenticateApiKey,
  getCelebrantBirthdayWish
);

export default router;
