import { Request, Response } from "express";
import { pool } from "../../configs/database";
import { celebrantSchema } from "../../validators/index";

async function checkUsernameExists(username: string) {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT COUNT(*) as count FROM celebration.celebrants WHERE username = $1",
      [username]
    );
    client.release();

    return result.rows[0].count > 0;
  } catch (error) {
    console.error("Error checking username existence:", error);
    throw error;
  }
}

const createCelebrant = async (req: Request, res: Response) => {
  const { error } = celebrantSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { username, gender, email, phone_number, birthdate, channel } =
    req.body;

  try {
    const usernameExists = await checkUsernameExists(username);

    if (usernameExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO celebration.celebrants (username, gender, email, phone_number, birthdate, channel, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [username, gender, email, phone_number, birthdate, channel, true]
    );

    client.release();
    const newCelebrant = result.rows[0];

    return res.status(200).json({
      success: true,
      message: "New Celebrant has been added successfully.",
      data: newCelebrant,
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({
      error: "An error occurred while creating the celebrant details!",
    });
  }
};

export default createCelebrant;
