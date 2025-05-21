import sanitizeHtml from 'sanitize-html';
import { Request, Response, NextFunction } from 'express';

const sanitizeValue = (value: any): any => {
  if (typeof value === 'string') {
    return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} });
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }
  if (value && typeof value === 'object') {
    for (const k of Object.keys(value)) {
      value[k] = sanitizeValue(value[k]);
    }
  }
  return value;
};

export const sanitizeInputs = (req: Request, _res: Response, next: NextFunction) => {
  if (req.body) req.body = sanitizeValue(req.body);

  if (req.query) {
    const cleanQuery: any = {};
    for (const k of Object.keys(req.query)) {
      cleanQuery[k] = sanitizeValue(req.query[k]);
    }
    (req as any).cleanQuery = cleanQuery;
  }

  if (req.params) {
    const cleanParams: any = {};
    for (const k of Object.keys(req.params)) {
      cleanParams[k] = sanitizeValue(req.params[k]);
    }
    (req as any).cleanParams = cleanParams;
  }

  next();
};
