import App from "../configs/app";
import request from "supertest";

describe("GET /", () => {
  it("respond with Server Running Successfully...", async () => {
    const app = new App();
    const response = await request(app.server).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Server Running Successfully...");
  });
});
