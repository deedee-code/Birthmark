import { Request, Response } from "express";
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

  return res.status(204).json({
    success: true,
    message: "Celebrant deleted successfully",
  });
};

export default deleteCelebrant;
