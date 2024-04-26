import passport from "passport";
import passportCustom from "passport-custom";
import bcrypt from "bcrypt";
const CustomStrategy = passportCustom.Strategy;
import { v4 as uuidv4 } from "uuid";
import { pool } from "../config/database";

async function hashPassword(password: string) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

passport.use(
  "custom-api-key",
  new CustomStrategy(async (req, done) => {
    try {
      const phone_number = req.body.phone_number;
      const password = req.body.password;

      // Check if the user exists
      const query = {
        text: "SELECT * FROM celebration.user WHERE phone_number = $1",
        values: [phone_number],
      };
      const result = await pool.query(query);

      if (result.rows.length > 0) {
        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password);

        if (match) {
          // Passwords match, return the user info
          return done(null, user);
        } else {
          // Passwords don't match
          return done(null, { message: "Incorrect password" });
        }
      } else {
        // User doesn't exist, create a new user with API key
        const hashedPassword = await hashPassword(password);
        const api_key = uuidv4(); // Generate a new UUID for API key

        const insertQuery = {
          text: "INSERT INTO celebration.user (phone_number, password, api_key) VALUES ($1, $2, $3) RETURNING *",
          values: [phone_number, hashedPassword, api_key],
        };
        const newUserResult = await pool.query(insertQuery);
        const newUser = newUserResult.rows[0];

        return done(null, newUser);
      }
    } catch (error) {
      return done(error);
    }
  })
);

export default passport;

// Check if the user exists
//     pool.query(
//       "SELECT * FROM celebration.user WHERE phone_number = $1 AND password = $2",
//       [phone_number, password],
//       (err, result) => {
//         if (err) {
//           return done(err.message);
//         }
//         if (result.rows.length > 0) {
//           // User exists, return the user info with existing API key
//           const user = result.rows[0];
//           const match = await bcrypt.compare(password, user.password);
//           if (match) {
//             // Passwords match, return the user info
//             return done(null, user);
//           } else {
//             // Passwords don't match
//             return done(null, { message: "Incorrect password" });
//           }
//         } else {
//           // User doesn't exist, create a new user with API key
//           const hashedPassword = await hashPassword(password);
//           const api_key = uuidv4(); // Generate a new UUID for API key
//           pool.query(
//             "INSERT INTO celebration.user (phone_number, password, api_key) VALUES ($1, $2, $3) RETURNING *",
//             [phone_number, hashedPassword, api_key],
//             (err, result) => {
//               if (err) {
//                 return done(err);
//               }
//               const newUser = result.rows[0];
//               return done(null, newUser);
//             }
//           );
//         }
//       }
//     );
