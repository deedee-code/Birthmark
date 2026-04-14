import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, full_name } = req.body;

  if (!email || !password || !full_name) {
    return res.status(400).json({ message: "Email, password, and full name are required." });
  }

  try {
    const user = await authService.registerUser(email, password, full_name);
    const { password_hash, ...safeUser } = user;
    return res.status(201).json({ success: true, data: safeUser });
  } catch (error: any) {
    const message = error?.message || "Unable to register user.";
    if (message.includes("already registered")) {
      return res.status(400).json({ message });
    }
    return res.status(500).json({ message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const user = await authService.validateUser(email, password);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const { password_hash, ...safeUser } = user;
    return res.status(200).json({ success: true, data: safeUser });
  } catch (error: any) {
    return res.status(500).json({ message: error?.message || "Login failed." });
  }
};
