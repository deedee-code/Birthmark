import request from "supertest";
import express from "express";
import apiAuthRoute from "../routes/apiAuth.route";
// import passport from "../controllers/index"; // Update with your actual file path

const app = express();
app.use("/api/v1", apiAuthRoute);

describe("Authentication API", () => {
  it("should authenticate user and return user data with correct credentials", async () => {
    const userData = {
      phone_number: "1234567890",
      password: "testpassword",
    };

    // Simulate a POST request to your authentication endpoint
    const response = await request(app).post("/auth").send(userData);
    //   .expect(200);

    // Check if the response contains expected user data
    // expect(response.body).toHaveProperty("phone_number");
    // expect(response.body).toHaveProperty("api_key");
    // expect(response.body).toHaveProperty("is_admin");
    expect(response.body).toHaveProperty(
      "message",
      "Successfully Signed-Up/Signed-In with API Key"
    );
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("user");
    // Add more assertions as needed
  });

  it("should return error with incorrect password", async () => {
    const userData = {
      phone_number: "1234567890",
      password: "wrongpassword",
    };

    // Simulate a POST request to your authentication endpoint
    const response = await request(app)
      .post("/auth")
      .send(userData)
      .expect(404);

    // Check if the response contains error message
    expect(response.body).toHaveProperty("message", "Incorrect password");
    // expect(response.body).toHaveProperty("message", "Authentication failed");
  });

  // Add more test cases for edge cases, error handling, etc.
});
