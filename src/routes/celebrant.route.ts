import express from "express";
import { authenticateApiKey } from "../middleware/index";
import {
  allCelebrants,
  createCelebrant,
  getACelebrant,
} from "../controllers/index";

const router = express.Router();

router.post("/", authenticateApiKey, createCelebrant);
router.get("/", authenticateApiKey, allCelebrants);
router.get("/:id", authenticateApiKey, getACelebrant);

export default router;
