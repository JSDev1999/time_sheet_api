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

export const updateTask = async (req, res, next) => {
  try {
    const { error, value } = await createTaskSchema.validate(req.body);
    if (error) {
      throw HttpErrors.Conflict(error.details[0].message);
    } else {
      const results = await taskModel.findByIdAndUpdate(
        req.query.taskId,
        {
          $set: value,
        },
        { new: true }
      );

      return res
        .status(HttpStatus.OK.code)
        .json(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "task updated",
            results
          )
        );
    }
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

export const getReports = async (req, res, next) => {
  try {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let first = today.getDate() - today.getDay();
    let last = first + 6;
    let firstday = new Date(today.setDate(first)).toUTCString();
    let lastday = new Date(today.setDate(last)).toUTCString();
    let firstDayMonth = new Date(today.setDate(1));
    let lastDayMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    lastDayMonth.setHours(23, 59, 59, 0);
    today = new Date().setHours(0, 0, 0, 0);

    let results;
    if (req.query.type == "today") {
      let completed = await taskModel
        .find({
          createdDate: { $gte: today },
          isCompleted: true,
        })
        .count();
      let pending = await taskModel
        .find({
          createdDate: { $gte: today },
          isCompleted: !true,
        })
        .count();
      results = [completed, pending];
    } else if (req.query.type == "weekly") {
      let completed = await taskModel
        .find({
          createdDate: { $gte: firstday, $lte: lastday },
          isCompleted: true,
        })
        .count();

      let pending = await taskModel
        .find({
          createdDate: { $gte: firstday, $lte: lastday },
          isCompleted: !true,
        })
        .count();
      results = [completed, pending];
    } else {
      let completed = await taskModel
        .find({
          createdDate: { $gte: firstDayMonth, $lte: lastDayMonth },
          isCompleted: true,
        })
        .count();
      let pending = await taskModel
        .find({
          createdDate: { $gte: firstDayMonth, $lte: lastDayMonth },
          isCompleted: !true,
        })
        .count();
      results = [completed, pending];
    }
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
