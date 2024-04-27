import { Request, Response } from "express";
import { pool } from "../../config/database";

const createCelebrant = async (req: Request, res: Response) => {
  const { username, gender, email, phone_number, birthdate, channel } =
    req.body;

  if (username) {
    return res.status(400).json({ message: "Username already exist!" });
  }

  try {
    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO celebration.celebrants (username, gender, email, phone_number, birthdate, channel, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [username, gender, email, phone_number, birthdate, channel, true]
    );

    client.release();
    const newCelebrant = result.rows[0];

    return res.status(200).json({
      success: true,
      message: "New Celebbrant has been added successfully.",
      celebrant: newCelebrant,
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({
      error: "An error occurred while creating the celebrant details!",
    });
  }
};

export default createCelebrant;
