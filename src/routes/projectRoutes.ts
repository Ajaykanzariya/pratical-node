import { Router } from "express";
import { createProject, deleteProject, getAllProjects, getProjectById, searchProjects, updateProject } from "../controllers/projectController";
import { validateCreateProject } from "../validators/projectValidator";
import { validate } from "../utils/validator"; // Import the generic validate function

const router = Router();

// POST route to create a project
router.post('/api/projects', validate(validateCreateProject), createProject);
router.get("/api/projects", getAllProjects);
router.get("/api/projects/:id",getProjectById);
router.put('/api/projects/:id', validate(validateCreateProject), updateProject);
router.delete("/api/projects/:id",deleteProject);
router.get('/api/projects/search', searchProjects);

export default router;
