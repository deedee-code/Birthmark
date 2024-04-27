import { Request, Response } from "express";
import { pool } from "../../config/database";

const getACelebrant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { fields } = req.query;

    let queryString = "SELECT ";
    const queryParams = [id];

    // Check if fields parameter is provided and construct SELECT query accordingly
    if (fields) {
      const selectedFields =
        typeof fields === "string"
          ? fields
              .split(",")
              .map((field) => field.trim())
              .filter((field) => field !== "id")
          : [];

      if (selectedFields.length === 0) {
        queryString += "*";
      } else {
        queryString += selectedFields.join(",");
      }
    } else {
      queryString += "*";
    }

    queryString += " FROM celebration.celebrants WHERE id = $1";

    // Execute the query
    const result = await pool.query(queryString, queryParams);
    const celebrant = result.rows[0];

    if (!celebrant) {
      return res.status(404).json({ error: "Celebrant not found" });
    }

    res.status(200).json({
      success: true,
      message: "Celebrant Id fetched successfully",
      celebrant: celebrant,
    });
  } catch (error) {
    console.error("Error fetching celebrant:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default getACelebrant;
