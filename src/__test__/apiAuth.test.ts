import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import passport from "../controllers/apiAuth.controller";
import { pool } from "../configs/database";
import router from "../routes/apiAuth.route";

const app = express();
app.use("/api/v1", router);

describe("Authentication Route", () => {
  let originalAuthenticate: any;

  beforeAll(() => {
    // Store the original passport.authenticate method
    originalAuthenticate = passport.authenticate;
  });

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  afterAll(() => {
    // Restore the original passport.authenticate method after all tests are done
    passport.authenticate = originalAuthenticate;
  });

  // Mock passport.authenticate to bypass actual authentication
  beforeEach(() => {
    passport.authenticate = jest.fn(
      (strategy: string, options?: any, callback?: any) =>
        (req: Request, res: Response, next: NextFunction) => {
          const user = {
            id: 1,
            phone_number: "1234567890",
            password: "password",
            api_key: "apikey123",
          };
          if (user) {
            next(user);
          } else {
            next(new Error("Authentication failed"));
          }
        }
    );
  });

  it("should return 200 and user data on successful authentication", async () => {
    const response = await request(app)
      .post("/auth")
      .send({ phone_number: "1234567890", password: "password" });
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user).toHaveProperty("phone_number", "1234567890");
    expect(response.body.user).toHaveProperty("api_key", "apikey123");
  });

  it("should return 401 on failed authentication", async () => {
    // Mock passport.authenticate to return null user
    passport.authenticate = jest.fn(
      (strategy: string, options?: any, callback?: any) =>
        (req: Request, res: Response, next: NextFunction) => {
          const user = {
            id: 1,
            phone_number: "1234567890",
            password: "password",
            api_key: "apikey123",
          };
          // Check if callback is a function before invoking it
          if (typeof callback === "function") {
            callback(null, user);
          }
          // Call the next middleware if callback is not provided or not a function
          next();
        }
    );

    const response = await request(app)
      .post("/auth")
      .send({ phone_number: "1234567890", password: "wrongpassword" });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Authentication failed");
  });

  it("should handle errors properly", async () => {
    // Mock passport.authenticate to throw an error
    passport.authenticate = jest.fn(
      (strategy: string, options?: any, callback?: any) =>
        (req: Request, res: Response, next: NextFunction) => {
          // Check if callback is a function before invoking it
          if (typeof callback === "function") {
            callback(new Error("Internal server error"), null);
          }
          // Call the next middleware if callback is not provided or not a function
          next();
        }
    );

    const response = await request(app)
      .post("/auth")
      .send({ phone_number: "1234567890", password: "password" });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Internal server error");
  });
});
