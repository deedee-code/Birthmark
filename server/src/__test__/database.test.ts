import { release } from "os";
import { pool } from "../configs/database";

describe("Database connection", () => {
  it("should connect to the database successfully", (done) => {
    pool.connect((err, client, release) => {
      if (err) {
        done.fail(err);
        return;
      }

      console.log("Connected to the Database Successfully...");
      release();
      done();
    });
  });

  it("should log an error if the database connection fails", (done) => {
    const error = new Error("Error connecting to the database");
    pool.connect((err) => {
      console.error("Error connecting to the database:", error.stack);
      release();
      done();
    });
  });
});
