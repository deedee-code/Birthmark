import express, { Request, Response } from "express";
import passport from "../controllers/index";

const router = express.Router();

// Define a route to handle authentication
router.post("/auth", async (req: Request, res: Response, next) => {
  // Use passport.authenticate middleware with your custom strategy
  await passport.authenticate("generate-api-key", (err: any, result: any) => {
    if (err) {
      return next(err); 
    }
    
    if (result.message) {
        return res.status(401).json({ success: false, ...result });
    }

    if (!result) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    return res.status(200).json({
      message: "Successfully Signed-Up/Signed-In with API Key",
      success: true,
      data: result,
    });
  })(req, res, next);
});

export default router;
