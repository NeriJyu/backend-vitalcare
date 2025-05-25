import { Request, Response, NextFunction } from "express";
import { logger } from "../../utils/logger.util";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
  });

  let formattedErr =
    err.message || err.toString() || err.stack || "Unknown error";

  res.status(500).json({
    status: "ERROR",
    message: formattedErr,
  });
}
