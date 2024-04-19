import { pool } from "../config/database";

describe("Database connection", () => {
  it("should connect to the database successfully", () => {
    pool.connect((err) => {
      expect(err).toBeNull();
      expect(console.log).toHaveBeenCalledWith(
        "Connected to the Database Successfully..."
      );
    });
  });

  it("should log an error if the database connection fails", () => {
    const error = new Error("Error connecting to the database");
    pool.connect((err) => {
      expect(err).toEqual(error);
      expect(console.error).toHaveBeenCalledWith(
        "Error connecting to the database:",
        error.stack
      );
    });
  });
});
