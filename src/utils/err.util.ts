import express from "express";
import { logger } from "./logger.util";

export const handleError = (
  err: any,
  res: express.Response,
  errTitle: string,
  statusCode?: number
) => {
  let status = 400;
  let formattedErr =
    err.message || err.toString() || "Unknown error";

  if (statusCode) status = statusCode;

  if (err?.status) status = err.status;

  if (err?.err) formattedErr = err.err;

    logger.error({
    message: formattedErr,
    title: errTitle,
    statusCode: status,
    stack: err?.stack,
  });

  res.status(status).send({
    status: "ERROR",
    err: errTitle,
    message: formattedErr,
  });
};
