import { Request, Response } from "express";
import { ContactService } from "../services/contact.service";
import { celebrantSchema } from "../validators/index";

const contactService = new ContactService();

export const getAllContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await contactService.getAllContacts();
    return res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getContact = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const contact = await contactService.getContactById(id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    return res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const createContact = async (req: Request, res: Response) => {
  const { error } = celebrantSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newContact = await contactService.createContact(req.body);
    return res.status(200).json({
      success: true,
      message: "New Contact has been added successfully.",
      data: newContact,
    });
  } catch (error: any) {
    if (error.message === "Username already exists") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ error: "An error occurred while creating the contact details!" });
  }
};

export const updateContact = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedContact = await contactService.updateContact(id, req.body);
    return res.status(200).json({
      success: true,
      message: "Contact details updated successfully.",
      data: updatedContact,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await contactService.deleteContact(id);
    return res.status(200).json({
      success: true,
      message: "Contact deleted successfully.",
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
