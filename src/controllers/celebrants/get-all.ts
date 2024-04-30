import { Request, Response } from "express";
import { pool } from "../../configs/database";

const allCelebrants = async (req: Request, res: Response) => {
  try {
    const { q, channel, birthdate, active, gender, sort, order_by } = req.query;

    let queryString = "SELECT * FROM celebration.celebrants WHERE 1=1";
    const queryParams = [];

    if (q) {
      queryString += ` AND username ~* $${queryParams.length + 1}`;
      queryParams.push(q);
    }

    if (channel) {
      queryString += ` AND channel = $${queryParams.length + 1}`;
      queryParams.push(channel);
    }

    if (birthdate) {
      const birthdateString = String(birthdate); // Convert birthdate to string
      const [month, day] = birthdateString.split("/"); // Split birthdate string
      queryString += ` AND EXTRACT(MONTH FROM birthdate) = EXTRACT(MONTH FROM $${
        queryParams.length + 1
      }) AND EXTRACT(DAY FROM birthdate) = EXTRACT(DAY FROM $${
        queryParams.length + 2
      })`;
      queryParams.push(month);
      queryParams.push(day);
    }

    if (active !== undefined) {
      queryString += ` AND is_active = $${queryParams.length + 1}`;
      queryParams.push(active);
    }

    if (gender) {
      queryString += ` AND gender = $${queryParams.length + 1}`;
      queryParams.push(gender);
    }

    if (sort && order_by) {
      if (typeof sort === "string" && typeof order_by === "string") {
        queryString += ` ORDER BY ${order_by} ${sort.toUpperCase()}`;
      }
    }

    // Execute the query
    const result = await pool.query(queryString, queryParams);
    const celebrants = result.rows;

    res.status(200).json({
      success: true,
      message: "Successfully fetched all Celebrants",
      All_Celebrants: celebrants,
    });
  } catch (error) {
    console.error("Error fetching celebrants:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default allCelebrants;
