import { Request, Response } from "express";
import { db } from "../config/firebaseConfig";
import { TaskRequest } from "../interfaces/TaskRequest";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection("tasks").get();
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(tasks);
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
    res.status(500).json({ error: "Error interno al obtener las tareas." });
  }
};

export const getTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const doc = await db.collection("tasks").doc(taskId).get();

  if (!doc.exists) {
    return res.status(404).json({ error: "Tarea no encontrada." });
  }

  const taskData = doc.data();
  res.json({ id: doc.id, ...taskData });
};

export const createTask = async (req: Request, res: Response) => {
  const body: TaskRequest = req.body;

  if (!body.title || !body.description) {
    return res
      .status(400)
      .json({ error: "El título y la descripción son obligatorios." });
  }

  const docRef = await db.collection("tasks").add({
    title: body.title,
    description: body.description,
    completed: body.completed || false,
  });

  res.json({ id: docRef.id });
};

export const updateTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const body: TaskRequest = req.body;

  const taskRef = db.collection("tasks").doc(taskId);

  await taskRef.update({
    title: body.title,
    description: body.description,
    completed: body.completed || false,
  });

  res.json({ message: "Tarea actualizada con éxito." });
};

export const deleteTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const taskRef = db.collection("tasks").doc(taskId);
  const doc = await taskRef.get();

  if (!doc.exists) {
    return res.status(404).json({ error: "Tarea no encontrada." });
  }

  await taskRef.delete();
  res.json({ message: "Tarea eliminada con éxito." });
};
