import server from "../server";
import request from "supertest";

describe("GET /", () => {
  it("respond with Server Running Successfully...", async () => {
    const response = await request(server).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Server Running Successfully...");
  });
});
