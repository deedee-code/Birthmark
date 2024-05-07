import { Request, Response } from "express";
import { pool } from "../../configs/database";
import { updateCelebrantValidator } from "../../validators/index";

const updateCelebrant = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { error } = updateCelebrantValidator.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Validation error",
      error,
    });
  }

  const { gender, phone_number, email, birthdate, channel } = req.body;

  try {
    const client = await pool.connect();

    const updates = [];
    const values = [];

    if (gender !== undefined) {
      updates.push("gender = $1");
      values.push(gender);
    }

    if (phone_number !== undefined) {
      updates.push("phone_number = $2");
      values.push(phone_number);
    }

    if (email !== undefined) {
      updates.push("email = $3");
      values.push(email);
    }

    if (birthdate !== undefined) {
      updates.push("birthdate = $4");
      values.push(birthdate);
    }

    if (channel !== undefined) {
      updates.push("channel = $5");
      values.push(channel);
    }

    const updateQuery = `UPDATE celebration.celebrants SET ${updates.join(
      ","
    )} WHERE id = $${values.length + 1} RETURNING *;`;
    values.push(id);

    const result = await client.query(updateQuery, values);

    client.release();

    const updatedCelebrant = result.rows[0];

    if (!updatedCelebrant) {
      return res.status(404).json({
        message: "Celebrant not found",
      });
    }

    return res.status(200).json({
      success: "true",
      message: "Celebrant updated successfully",
      data: updatedCelebrant,
    });
  } catch (error) {
    console.error("Error fetching celebrant:", error);
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export default updateCelebrant;
