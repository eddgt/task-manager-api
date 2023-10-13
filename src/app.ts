import express, { Request, Response, NextFunction } from "express";
import taskRoutes from "./routes/tasks.route";
const cors = require("cors"); // Importa el módulo CORS

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const allowedOrigins = ["http://localhost:4200", "http://24.199.96.42"]; // Agrega tus orígenes permitidos aquí

// Configura la política CORS
app.use(
  cors({
    origin: allowedOrigins,
    optionsSuccessStatus: 200, // Algunos navegadores pueden requerir esto
  })
);

app.use("/api/tasks", taskRoutes);

// Manejo de errores 404 (ruta no encontrada)
app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejo de errores generales
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
