import { Request, Response, NextFunction } from "express";
import { pool } from "../configs/database";

const authenticateApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers["api_key"];

  if (!apiKey) {
    return res.status(401).json({ message: "API key is required" });
  }

  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT id FROM celebration.user WHERE api_key = $1",
      [apiKey]
    );
    client.release();

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid API key" });
    }

    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default authenticateApiKey;
