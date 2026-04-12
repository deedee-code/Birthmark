import { Request, Response } from "express";
import { CelebrantService } from "../services/celebrant.service";
import { celebrantSchema } from "../validators/index";

const celebrantService = new CelebrantService();

export const getAllCelebrants = async (req: Request, res: Response) => {
  try {
    const celebrants = await celebrantService.getAllCelebrants();
    return res.status(200).json({
      success: true,
      data: celebrants,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCelebrant = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const celebrant = await celebrantService.getCelebrantById(id);
    if (!celebrant) {
      return res.status(404).json({ error: "Celebrant not found" });
    }
    return res.status(200).json({
      success: true,
      data: celebrant,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const createCelebrant = async (req: Request, res: Response) => {
  const { error } = celebrantSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newCelebrant = await celebrantService.createCelebrant(req.body);
    return res.status(200).json({
      success: true,
      message: "New Celebrant has been added successfully.",
      data: newCelebrant,
    });
  } catch (error: any) {
    if (error.message === "Username already exists") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ error: "An error occurred while creating the celebrant details!" });
  }
};

export const updateCelebrant = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const updatedCelebrant = await celebrantService.updateCelebrant(id, req.body);
    return res.status(200).json({
      success: true,
      message: "Celebrant details updated successfully.",
      data: updatedCelebrant,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteCelebrant = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await celebrantService.deleteCelebrant(id);
    return res.status(200).json({
      success: true,
      message: "Celebrant deleted successfully.",
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
