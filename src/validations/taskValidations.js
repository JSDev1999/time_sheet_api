import Joi from "joi";

export const createTaskSchema = Joi.object({
  taskName: Joi.string().trim().min(4).required(),
});
