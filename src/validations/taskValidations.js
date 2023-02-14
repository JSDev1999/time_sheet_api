import Joi from "joi";

export const createTaskSchema = Joi.object({
  title: Joi.string().trim().min(4).required(),
  createdDate: Joi.date().required(),
  dueDate: Joi.date().required(),
  isCompleted: Joi.boolean(),
});
