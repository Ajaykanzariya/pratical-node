import { ValidationChain, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Generic validation function
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Run the validation rules
    await Promise.all(validations.map(validation => validation.run(req)));

    // Check if there are validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Send validation errors as response (no return, just end the function here)
      res.status(400).json({ errors: errors.array() });
      return; // Just return here to end the function without any further action
    }

    // No errors, continue to the next middleware (controller)
    next();
  };
};
