import HttpErrors from "http-errors";
import { HttpStatus, Response } from "../helpers/Response.js";
import taskModel from "../models/taskModel.js";
import { createTaskSchema } from "../validations/taskValidations.js";

export const createTask = async (req, res, next) => {
  try {
    const { error, value } = await createTaskSchema.validate(req.body);
    if (error) {
      throw HttpErrors.Conflict(error.details[0].message);
    } else {
      await taskModel.create(value).then((results) => {
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
      });
    }
  } catch (error) {
    return res
      .status(HttpStatus.OK.code)
      .json(
        new Response(HttpStatus.OK.code, HttpStatus.OK.status, error.message)
      );
  }
};

export const getAllTasks = async (req, res, next) => {
  try {
    await taskModel
      .find({})
      .then((resp) => {
        return res
          .status(HttpStatus.OK.code)
          .json(
            new Response(
              HttpStatus.OK.code,
              HttpStatus.OK.status,
              "operation successfull",
              resp
            )
          );
      })
      .catch((error) => {
        return res
          .status(HttpStatus.OK.code)
          .json(
            new Response(
              HttpStatus.OK.code,
              HttpStatus.OK.status,
              error.message
            )
          );
      });
  } catch (error) {
    return res
      .status(HttpStatus.BAD_REQUEST.code)
      .json(
        new Response(
          HttpStatus.BAD_REQUEST.code,
          HttpStatus.BAD_REQUEST.status,
          error.message
        )
      );
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    let id = req.query.taskId;
    const results = await taskModel.findByIdAndDelete(id);
    return res
      .status(HttpStatus.OK.code)
      .json(
        new Response(
          HttpStatus.OK.code,
          HttpStatus.OK.status,
          "operation successfull",
          results
        )
      );
  } catch (error) {
    return res
      .status(HttpStatus.BAD_REQUEST.code)
      .json(
        new Response(
          HttpStatus.BAD_REQUEST.code,
          HttpStatus.BAD_REQUEST.status,
          error.message
        )
      );
  }
};
