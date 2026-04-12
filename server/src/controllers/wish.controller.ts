import { Request, Response } from "express";
import { WishService } from "../services/wish.service";
import { postBirthdayWishValidator } from "../validators/index";

const wishService = new WishService();

export const createWish = async (req: Request, res: Response) => {
  const { error } = postBirthdayWishValidator.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { celebrant_id, message, scheduled_time } = req.body;

  try {
    const newWish = await wishService.createWish(celebrant_id, message, scheduled_time);
    return res.status(201).json({
      success: true,
      message: "Birthday Wish created successfully",
      data: newWish,
    });
  } catch (error: any) {
    if (error.message === "Celebrant not found") {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: "An error occurred while creating the wish!" });
  }
};

export const getCelebrantWishes = async (req: Request, res: Response) => {
  try {
    const celebrant_id = parseInt(req.params.celebrant_id);
    const wishes = await wishService.getWishesByCelebrant(celebrant_id);
    return res.status(200).json({
      success: true,
      data: wishes,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
