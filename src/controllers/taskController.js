import Bcrypt from "bcrypt";
import HttpErrors from "http-errors";
import JWT from "jsonwebtoken";
import { HttpStatus, Response } from "../helpers/Response.js";
import taskModel from "../models/taskModel.js";
import { createTaskSchema } from "../validations/taskValidations.js";

export const createTask = async (req, res, next) => {
  try {
    const { error, value } = await createTaskSchema.validate(req.body);
    if (error) {
      throw HttpErrors.Conflict(error.details[0].message);
    } else {
      const results = await taskModel.create(value);

      return res
        .status(HttpStatus.OK.code)
        .json(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "task created",
            results
          )
        );
    }
  } catch (error) {
    return res
      .status(HttpStatus.OK.code)
      .json(
        new Response(HttpStatus.OK.code, HttpStatus.OK.status, error.message)
      );
  }
};
