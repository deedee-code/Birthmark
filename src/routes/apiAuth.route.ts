import express, { Request, Response } from "express";
import passport from "../controllers/index";

const router = express.Router();

// Define a route to handle authentication
router.post("/auth", (req: Request, res: Response, next) => {
  // Use passport.authenticate middleware with your custom strategy
  passport.authenticate("custom-api-key", (err: string, user: object) => {
    if (err) {
      return next(err); // Pass error to Express error handler
    }
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    // If authentication succeeds, you can handle the user data as needed
    return res.status(200).json({
      message: "Successfully Signed-Up/Signed-In with API Key",
      success: true,
      user: user,
    });
  })(req, res, next); // Call the authenticate middleware with req, res, next
});

export default router;
