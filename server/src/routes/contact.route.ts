import express from "express";
import {
  getAllContacts,
  createContact,
  deleteContact,
  getContact,
  getContactTemplates,
  createTemplate,
  updateContact,
} from "../controllers/index";

const router = express.Router();

router.post("/", createContact);
router.get("/", getAllContacts);
router.get("/:id", getContact);
router.patch("/:id", updateContact);
router.delete("/:id", deleteContact);
router.post("/templates", createTemplate);
router.get("/templates/:contact_id", getContactTemplates);

export default router;
