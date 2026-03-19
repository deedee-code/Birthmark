import joi from "joi";

const createCelebrantSchema = joi.object({
  username: joi.string().required(),
  gender: joi.string().valid("M", "F", "O").required(),
  email: joi.string().email(),
  phone_number: joi.string(),
  birthdate: joi.date().iso().required(),
  channel: joi.string().required(),
});

export default createCelebrantSchema;
