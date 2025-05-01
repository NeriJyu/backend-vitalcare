import express from "express";

export const handleError = (
  err: any,
  res: express.Response,
  errTitle: string
) => {
  let status = 400;
  let formattedErr =
    err.message || err.message || err.toString() || "Unknown error";

  if (err?.status) status = err.status;

  if (err?.err) formattedErr = err.err;

  res.status(status).send({
    status: "ERROR",
    err: errTitle,
    message: formattedErr,
  });
};
