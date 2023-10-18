import { db } from "../config/firebaseConfig";
import { Task } from "../models/task.model";

export const getTasks = async () => {
  const snapshot = await db.collection("tasks").get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Task[];
};

export const getTask = async (taskId: string) => {
  const doc = await db.collection("tasks").doc(taskId).get();
  return doc.exists ? ({ id: doc.id, ...doc.data() } as Task) : null;
};

export const createTask = async (taskData: Task) => {
  const docRef = await db.collection("tasks").add(taskData);
  return { id: docRef.id };
};

export const updateTask = async (taskId: string, taskData: Task) => {
  const taskRef = db.collection("tasks").doc(taskId);
  const taskDataUpdate = {
    title: taskData.title,
    description: taskData.description,
    completed: taskData.completed,
  };

  await taskRef.update(taskDataUpdate);
  return { message: "Tarea actualizada con éxito." };
};

export const deleteTask = async (taskId: string) => {
  const taskRef = db.collection("tasks").doc(taskId);
  const doc = await taskRef.get();

  if (!doc.exists) {
    return false;
  }

  await taskRef.delete();
  return true;
};
