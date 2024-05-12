import joi from "joi";

const updateCelebrantValidator = joi.object({
  gender: joi.string().valid("M", "F", "O"),
  email: joi.string().email(),
  phone_number: joi.string(),
  birthdate: joi.date().iso(),
  channel: joi.string(),
});

export default updateCelebrantValidator;
