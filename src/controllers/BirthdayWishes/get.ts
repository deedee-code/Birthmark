import { Request, Response } from "express";
import { pool } from "../../configs/database";

const getCelebrantBirthdayWish = async (req: Request, res: Response) => {
  const celebrantId = req.params.celebrantId;

  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM celebration.birthday_wishes WHERE celebrant_id = $1",
      [celebrantId]
    );

    client.release();

    const celebrantWishes = result.rows;

    res.status(200).json({
      success: true,
      message: "Birthday wishes retrieved successfully!",
      data: celebrantWishes,
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while creating the celebrant details!",
    });
  }
};

export default getCelebrantBirthdayWish;
