import { Request, Response, NextFunction } from "express";

// Error handling middleware
export const errorHandler = (
  err: any, // Error can be of any type
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  console.error(err); // Log the error
  return res.status(500).json({
    message: "An unexpected error occurred.",
    error: err.message || "Unknown error",
  });
};
