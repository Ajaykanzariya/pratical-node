import { Response } from "express";

// Common response function for success
export const resSuccess = (res: Response, message: string, data: any) => {
  return res.status(201).json({
    message,
    data,
  });
};

// Common response function for 404 Not Found
export const resNotFound = (res: Response, message: string): void => {
  res.status(404).json({
    code: 404,
    message,
  });
};

export const resBadRequest = (res: Response, message: string): void => {
  res.status(400).json({
    message,
  });
};
