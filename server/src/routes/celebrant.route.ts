import express from "express";
import { authenticateApiKey } from "../middlewares/index";
import {
  getAllCelebrants,
  createCelebrant,
  deleteCelebrant,
  getCelebrant,
  getCelebrantWishes,
  createWish,
  updateCelebrant,
} from "../controllers/index";

const router = express.Router();

router.post("/", authenticateApiKey, createCelebrant);
router.get("/", authenticateApiKey, getAllCelebrants);
router.get("/:id", authenticateApiKey, getCelebrant);
router.patch("/:id", authenticateApiKey, updateCelebrant);
router.delete("/:id", authenticateApiKey, deleteCelebrant);
router.post("/birthday-wish", authenticateApiKey, createWish);
router.get(
  "/birthday-wish/:celebrant_id",
  authenticateApiKey,
  getCelebrantWishes
);

export default router;
