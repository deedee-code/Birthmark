import express from "express";
import { authenticateApiKey } from "../middlewares/index";
import {
  allCelebrants,
  createCelebrant,
  deleteCelebrant,
  getACelebrant,
  updateCelebrant,
} from "../controllers/index";

const router = express.Router();

router.post("/", authenticateApiKey, createCelebrant);
router.get("/", authenticateApiKey, allCelebrants);
router.get("/:id", authenticateApiKey, getACelebrant);
router.patch("/:id", authenticateApiKey, updateCelebrant);
router.delete("/:id", authenticateApiKey, deleteCelebrant);

export default router;
