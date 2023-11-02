import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
app.use(cors());
app.use(express.json()); // Para analizar JSON en el cuerpo de las solicitudes

// Configurar middleware que analiza el cuerpo de las solicitudes JSON.
app.use(express.urlencoded({ extended: true })); // Para analizar datos de formulario en el cuerpo de las solicitudes
app.use("/public", express.static("public"));

/**
 * Establecer EJS como el Motor de plantillas
 */
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("inicio", {
    rutaActual: "/",
  });
});

// Ruta para obtener todos los estudiantes
app.get("/lista-de-estudiantes", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM estudiantes");
    res.render("pages/estudiantes", {
      rutaActual: "/lista-estudiante",
      results: rows, // Cambia "results" a "rows"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener estudiantes" });
  }
});

// Ruta para crear un estudiante
app.post("/estudiantes", async (req, res) => {
  const { nombre_alumno, email_alumno, curso_alumno } = req.body;

  try {
    await pool.query(
      "INSERT INTO estudiantes (nombre_alumno, email_alumno, curso_alumno, created_at) VALUES (?, ?, ?, ?)",
      [nombre_alumno, email_alumno, curso_alumno, new Date()]
    );
    // Redirige a la página de lista de estudiantes después de la inserción
    res.redirect("/lista-estudiante");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el estudiante" });
  }
});

// Ruta para actualizar un estudiante por ID
app.put("/estudiantes/:id", async (req, res) => {
  const { nombre_alumno, email_alumno, curso_alumno } = req.body;
  const id = req.params.id;

  try {
    await pool.query(
      "UPDATE estudiantes SET nombre_alumno = ?, email_alumno = ?, curso_alumno = ? WHERE id = ?",
      [nombre_alumno, email_alumno, curso_alumno, id]
    );
    res.json({ message: `Estudiante con ID ${id} actualizado con éxito` });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Error al actualizar el estudiante con ID ${id}` });
  }
});

// Ruta para borrar un estudiante por ID
app.delete("/estudiantes/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await pool.query("DELETE FROM estudiantes WHERE id = ?", [id]);
    res.json({ message: `Estudiante con ID ${id} eliminado con éxito` });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Error al eliminar el estudiante con ID ${id}` });
  }
});

const PORT = process.env.PORT || 3600;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://127.0.0.1:${PORT}`);
});
