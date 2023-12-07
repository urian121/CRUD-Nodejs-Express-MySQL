// router.js
import express from "express";

import {
  agregarEstudiante,
  listarEstudiantes,
  eliminarEstudiante,
  actualizarEstudiante,
  obtenerDetallesEstudiante,
  obtenerDetallesEstudianteUpdate,
} from "./estudianteController.js";

const router = express.Router();

let url_crud = "/Crud-Completo-con-NodeJS-ExpressJS-y-MySQL";
router.get(url_crud, async (req, res) => {
  try {
    const estudiantes = await listarEstudiantes();
    res.render("pages/estudiantes", {
      rutaActual: "/",
      estudiantes,
    });
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Listar de Estudiantes
router.get("/", async (req, res) => {
  try {
    const estudiantes = await listarEstudiantes();
    res.render("pages/estudiantes", {
      rutaActual: "/",
      estudiantes,
    });
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Registrar un nuevo estudiante
router.post("/estudiantes", async (req, res) => {
  const { nombre_alumno, email_alumno, curso_alumno } = req.body;

  try {
    await agregarEstudiante({ nombre_alumno, email_alumno, curso_alumno });
    res.redirect("/");
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Detalles del estudiante
router.get("/detalles/:id", async (req, res) => {
  const estudianteId = req.params.id;

  try {
    const estudiante = await obtenerDetallesEstudiante(estudianteId);
    res.render("pages/detalles_estudiante", {
      rutaActual: "/",
      estudiante,
    });
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Mostrar formulario para actualizar un estudiante
router.get("/formulario-actualizar-estudiante/:id", async (req, res) => {
  const estudianteId = req.params.id;

  try {
    const estudiante = await obtenerDetallesEstudianteUpdate(estudianteId);

    res.render("pages/update_estudiante", {
      rutaActual: "/",
      estudiante,
    });
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Ruta para actualizar un estudiante por ID
router.post("/actualizar-estudiante/:id", async (req, res) => {
  const { nombre_alumno, email_alumno, curso_alumno } = req.body;
  const id = req.params.id;

  try {
    await actualizarEstudiante(id, {
      nombre_alumno,
      email_alumno,
      curso_alumno,
    });
    const estudiantes = await listarEstudiantes();
    res.render("pages/estudiantes", {
      rutaActual: "/",
      estudiantes,
    });
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Ruta para borrar un estudiante por ID
router.post("/borrar-estudiante/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await eliminarEstudiante(id);
    const estudiantes = await listarEstudiantes();
    res.render("pages/estudiantes", {
      rutaActual: "/",
      estudiantes,
    });
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

export default router;
