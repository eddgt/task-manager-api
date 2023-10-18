import { Request, Response } from "express";
import * as TaskService from "../services/task.service";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskService.getTasks();
    res.json(tasks);
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
    res.status(500).json({ error: "Error interno al obtener las tareas." });
  }
};

export const getTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const task = await TaskService.getTask(taskId);

  if (!task) {
    return res.status(404).json({ error: "Tarea no encontrada." });
  }

  res.json(task);
};

export const createTask = async (req: Request, res: Response) => {
  const taskData = req.body;
  const createdTask = await TaskService.createTask(taskData);
  res.json(createdTask);
};

export const updateTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const taskData = req.body;
  const updatedTask = await TaskService.updateTask(taskId, taskData);
  res.json(updatedTask);
};

export const deleteTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const success = await TaskService.deleteTask(taskId);

  if (!success) {
    return res.status(404).json({ error: "Tarea no encontrada." });
  }

  res.json({ message: "Tarea eliminada con éxito." });
};
