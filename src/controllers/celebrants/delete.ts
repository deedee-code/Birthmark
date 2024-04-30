import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { pool } from "../../configs/database";

const deleteCelebrant = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await pool.query(
    `UPDATE celebration.celebrants
         SET is_active = false,
             username = FLOOR(10000000 + random() * 90000000),
             updated_at = NOW()
         WHERE id = $1
         RETURNING *`,
    [id]
  );

  const updatedCelebrant = result.rows[0];

  if (!updatedCelebrant) {
    return res.status(404).json({ error: "Celebrant not found" });
  }

  return res.status(200).json({
    success: true,
    message: "Celebrant deleted successfully",
    data: result.rows[0],
  });
};

export default deleteCelebrant;

// (username = Math.floor(1000 + Math.random() * 9000)),
//   (added_by = "system");
