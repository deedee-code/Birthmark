import { Request, Response } from "express";
import { TemplateService } from "../services/template.service";
import { postBirthdayWishValidator } from "../validators/index";

const templateService = new TemplateService();

export const createTemplate = async (req: Request, res: Response) => {
  const { error } = postBirthdayWishValidator.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { contact_id, message, scheduled_time } = req.body;

  try {
    const newTemplate = await templateService.createTemplate(contact_id, message, scheduled_time);
    return res.status(201).json({
      success: true,
      message: "Birthday Wish created successfully",
      data: newTemplate,
    });
  } catch (error: any) {
    if (error.message === "Celebrant not found") {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: "An error occurred while creating the wish!" });
  }
};

export const getContactTemplates = async (req: Request, res: Response) => {
  try {
    const contact_id = req.params.contact_id;
    const templates = await templateService.getTemplatesByContact(contact_id);
    return res.status(200).json({
      success: true,
      data: templates,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
