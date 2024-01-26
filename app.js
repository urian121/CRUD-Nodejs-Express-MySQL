import express from "express";
import cors from "cors";
import router from "./src/router.js"; // Importa el enrutador

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

//Establece el motor de plantillas
app.set("view engine", "ejs");
app.set("views", "./views");

// Carga la página de inicio
app.get("/", (req, res) => {
  res.render("inicio", {});
});

// Usa el enrutador para las rutas relacionadas con estudiantes
app.use("/", router);

const PORT = process.env.PORT || 3600;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://127.0.0.1:${PORT}`);
});
