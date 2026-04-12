import passport from "passport";
import passportCustom from "passport-custom";
import { AuthService } from "../services/auth.service";

const CustomStrategy = passportCustom.Strategy;
const authService = new AuthService();

passport.use(
  "generate-api-key",
  new CustomStrategy(async (req, done) => {
    try {
      const { phone_number, password } = req.body;
      const validationResult = await authService.validateUser(phone_number, password);

      if (validationResult === null) {
        // User doesn't exist, create one
        const newUser = await authService.registerUser(phone_number, password);
        return done(null, newUser);
      }

      if ("message" in validationResult) {
        // invalid credentials
        return done(null, validationResult);
      }

      // Valid user
      return done(null, validationResult);
    } catch (error) {
      return done(error);
    }
  })
);

export default passport;
