import express, { Request, Response } from "express";
import passport from "../controllers/passport-custom";

const router = express.Router();

// Define a route to handle authentication
router.post("/auth", (req: Request, res: Response, next) => {
  // Use passport.authenticate middleware with your custom strategy
  passport.authenticate("custom-api-key", (err: String, user: Object) => {
    if (err) {
      return next(err); // Pass error to Express error handler
    }
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    // If authentication succeeds, you can handle the user data as needed
    return res.json({ user });
  })(req, res, next); // Call the authenticate middleware with req, res, and next
});

export default router;
