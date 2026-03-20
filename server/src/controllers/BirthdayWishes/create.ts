import { Request, Response } from "express";
import { pool } from "../../configs/database";
import { postBirthdayWishValidator } from "../../validators/index";

const postWishes = async (req: Request, res: Response) => {
  const { error } = postBirthdayWishValidator.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { celebrant_id, message, scheduled_time } = req.body;

  try {
    const client = await pool.connect();

    // Check if the celebrant_id exists in the celebrants table
    const celebrantExists = await client.query(
      "SELECT COUNT(*) FROM celebration.celebrants WHERE id = $1",
      [celebrant_id]
    );

    if (celebrantExists.rows[0].count === "0") {
      return res.status(404).json({ error: "Celebrant not found" });
    }

    const result = await pool.query(
      "INSERT INTO celebration.birthday_wishes (celebrant_id, message, scheduled_time) VALUES ($1, $2, $3) RETURNING *",
      [celebrant_id, message, scheduled_time]
    );

    client.release();
    const createWish = result.rows[0];

    return res.status(201).json({
      success: true,
      message: "BirthdayWish created successfully",
      data: createWish,
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while creating the celebrant details!",
    });
  }
};

export default postWishes;
