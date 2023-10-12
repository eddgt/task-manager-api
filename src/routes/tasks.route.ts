import { Router } from "express";
import * as TaskController from "../controllers/task.controller";

const router = Router();

router.get("/", TaskController.getTasks);
router.get("/:taskId", TaskController.getTask);
router.post("/", TaskController.createTask);
router.put("/:taskId", TaskController.updateTask);
router.delete("/:taskId", TaskController.deleteTask);

export default router;
