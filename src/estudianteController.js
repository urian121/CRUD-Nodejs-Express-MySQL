import pool from "./db.js";

// Agregar un nuevo estudiante
export const agregarEstudiante = async ({
  nombre_alumno,
  email_alumno,
  curso_alumno,
}) => {
  try {
    await pool.query(
      "INSERT INTO estudiantes (nombre_alumno, email_alumno, curso_alumno, created_at) VALUES (?, ?, ?, ?)",
      [nombre_alumno, email_alumno, curso_alumno, new Date()]
    );
  } catch (error) {
    throw { status: 500, message: "Error al crear el estudiante" };
  }
};

// Obtener todos los estudiantes
export const listarEstudiantes = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM estudiantes");
    return rows;
  } catch (error) {
    throw { status: 500, message: "Error al obtener estudiantes" };
  }
};

// Obtener detalles de un estudiante por ID
export const obtenerDetallesEstudiante = async (id) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM estudiantes WHERE id_estudiante = ?",
      [id]
    );

    if (rows.length === 1) {
      const estudiante = rows[0];
      return estudiante;
    } else {
      throw { status: 404, message: "Estudiante no encontrado" };
    }
  } catch (error) {
    console.error(error);
    throw { status: 500, message: "Error al obtener detalles del estudiante" };
  }
};

//Obtener formualrio para actualizar estudiante seleccionado
export async function obtenerDetallesEstudianteUpdate(id) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM estudiantes WHERE id_estudiante = ?",
      [id]
    );

    if (rows.length === 1) {
      return rows[0];
    } else {
      throw { status: 404, message: "Estudiante no encontrado" };
    }
  } catch (error) {
    console.error(error);
    throw { status: 500, message: "Error al obtener detalles del estudiante" };
  }
}

// Actualizar un estudiante por ID
export const actualizarEstudiante = async (
  id,
  { nombre_alumno, email_alumno, curso_alumno }
) => {
  try {
    await pool.query(
      "UPDATE estudiantes SET nombre_alumno = ?, email_alumno = ?, curso_alumno = ? WHERE id_estudiante = ?",
      [nombre_alumno, email_alumno, curso_alumno, id]
    );
  } catch (error) {
    throw {
      status: 500,
      message: `Error al actualizar el estudiante con ID ${id}`,
    };
  }
};

// Eliminar un estudiante por ID
export const eliminarEstudiante = async (id) => {
  try {
    await pool.query("DELETE FROM estudiantes WHERE id_estudiante = ?", [id]);
  } catch (error) {
    throw {
      status: 500,
      message: `Error al eliminar el estudiante con ID ${id}`,
    };
  }
};
