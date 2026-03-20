import joi from "joi";

const postBirthdayWishValidator = joi.object({
  celebrant_id: joi.number().integer().required(),
  message: joi.string().required(),
  scheduled_time: joi.date().iso().required(),
});

export default postBirthdayWishValidator;
