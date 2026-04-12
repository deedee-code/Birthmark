import { Request, Response, NextFunction } from "express";
import prisma from "../configs/prisma";

const authenticateApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers["api_key"] as string;

  if (!apiKey) {
    return res
      .status(401)
      .json({ success: false, message: "API key is required" });
  }

  try {
    const user = await prisma.user.findFirst({
      where: { api_key: apiKey },
      select: { id: true },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid API key" });
    }

    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default authenticateApiKey;
