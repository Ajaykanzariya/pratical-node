import { body } from 'express-validator';
import { STATUS } from '../utils/app-enumration';

// Validator for project creation
export const validateCreateProject = [
    body('name')
      .isString()
      .withMessage('Project name must be a string')
      .notEmpty()
      .withMessage('Project name is required'),
    body('description')
      .isString()
      .withMessage('Description must be a string')
      .optional(),
    body('status')
      .isIn([STATUS.NotStarted, STATUS.InProgress, STATUS.Completed])
      .withMessage(`Status must be one of: ${Object.values(STATUS).join(', ')}`)
      .notEmpty()
      .withMessage('Project status is required'),
    body('due_date')
      .isDate()
      .withMessage('Due date must be a valid date')
      .notEmpty()
      .withMessage('Due date is required'),
  ];
