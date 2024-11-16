import { Request, Response, NextFunction } from "express";
import Project from "../models/projectModel";
import {
  resBadRequest,
  resNotFound,
  resSuccess,
} from "../utils/responseHelper";
import { Op } from "sequelize";
import { STATUS } from "../utils/app-enumration";

// Controller to create a project
export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, description, status, due_date } = req.body;

    const newProject = await Project.create({
      name,
      description,
      status,
      due_date,
    });

    // Use the common resSuccess function
    resSuccess(res, "Project created successfully!", newProject);
  } catch (err) {
    next(err); // Pass the error to the error handler
  }
};

// Get all projects
export const getAllProjects = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // Extract the status and sort query parameters
      const { status, sort } = req.query;
  
      // Validate the status if provided
      if (status && !Object.values(STATUS).includes(status as STATUS)) {
        return resNotFound(res, "Invalid status value." );
      }
  
      // Build the "where" condition dynamically
      const whereCondition: any = { is_deleted: false }; // Ensure we only fetch non-deleted projects
  
      // Add status filter if provided and valid
      if (status) {
        whereCondition.status = status;
      }
  
      // Determine the sorting order (default is ascending if no `sort` query is provided)
      const orderCondition: any = [["due_date", "ASC"]]; // Default to ascending order
  
      if (sort && (sort === 'asc' || sort === 'desc')) {
        orderCondition[0][1] = sort.toUpperCase(); // Update the sort direction based on the query
      }
  
      // Fetch projects based on the dynamic condition and sorting
      const projects = await Project.findAll({
        where: whereCondition,
        order: orderCondition, // Apply sorting based on `due_date`
      });
  
    
  
      // If projects are found, respond with the data
      resSuccess(res, "Projects fetched successfully", projects);
    } catch (err) {
      next(err); // Pass the error to the error handler
    }
  };

// Get a single project by ID
export const getProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    if (!id) {
      return resBadRequest(res, "id is require");
    }

    const project = await Project.findOne({
      where: {
        is_deleted: false,
        id: id,
      },
    });

    if (!project) {
      return resNotFound(res, `Project with ID ${id} not found`);
    }

    resSuccess(res, "Project fetched successfully", project);
  } catch (err) {
    next(err); // Pass the error to the error handler
  }
};

// Update Project
export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const { name, description, status, due_date } = req.body;

  try {
    // Find the project by ID
    if (!id) {
      return resBadRequest(res, "id is require");
    }

    const project = await Project.findOne({
      where: {
        is_deleted: false,
        id: id,
      },
    });

    if (!project) {
      return resNotFound(res, `Project with ID ${id} not found`);
    }

    // Update project fields
    project.name = name;
    project.description = description;
    project.status = status;
    project.due_date = due_date;
    project.updated_at = new Date(); // Update timestamp

    // Save the updated project
    await project.save();

    resSuccess(res, "Project updated successfully", project);
  } catch (err) {
    next(err); // Pass the error to the error handler
  }
};

// Soft Delete Project
export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    // Find the project by ID
    const project = await Project.findByPk(id);

    if (!project) {
      return resNotFound(res, `Project with ID ${id} not found`);
    }

    // Soft delete the project (mark is_deleted as true)
    project.is_deleted = true;
    project.updated_at = new Date(); // Update timestamp
    await project.save();

    resSuccess(res, "Project soft deleted successfully", project);
  } catch (err) {
    next(err); // Pass the error to the error handler
  }
};

export const searchProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { search } = req.query; // Extract search query from the request

    if (!search || typeof search !== "string") {
      return resBadRequest(res, "Search query is required");
    }

    // Use Sequelize to find projects
    const projects = await Project.findAll({
      where: {
        name: {
          [Op.iLike]: `%${search}%`, // Search for projects whose name contains the search term
        },
        is_deleted: false, // Ensure the project is not deleted
      },
    });

    if (projects.length === 0) {
      return resNotFound(res, " No projects found matching your search.");
    }

    resSuccess(res, "Projects retrieved successfully!", projects);


  
  } catch (err) {
    next(err); // Pass the error to the error handler
  }
};
