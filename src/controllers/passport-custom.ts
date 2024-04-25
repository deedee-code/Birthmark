import passport from "passport";
import passportCustom from "passport-custom";
const CustomStrategy = passportCustom.Strategy;
import { v4 as uuidv4 } from "uuid";
import { pool } from "../config/database";

passport.use(
  "custom-api-key",
  new CustomStrategy((req, done) => {
    const phone_number = req.body.phone_number;
    const password = req.body.password;

    // Check if the user exists
    pool.query(
      "SELECT * FROM celebration.user WHERE phone_number = $1 AND password = $2",
      [phone_number, password],
      (err, result) => {
        if (err) {
          return done(err.message);
        }
        if (result.rows.length > 0) {
          // User exists, return the user info with existing API key
          const user = result.rows[0];
          return done(null, user);
        } else {
          // User doesn't exist, create a new user with API key
          const api_key = uuidv4(); // Generate a new UUID for API key
          pool.query(
            "INSERT INTO celebration.user (phone_number, password, api_key) VALUES ($1, $2, $3) RETURNING *",
            [phone_number, password, api_key],
            (err, result) => {
              if (err) {
                return done(err);
              }
              const newUser = result.rows[0];
              return done(null, newUser);
            }
          );
        }
      }
    );
  })
);

export default passport;
