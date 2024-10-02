const express = require("express");
const morgan = require("morgan");

// Importamos librería
const fileUpload = require("express-fileupload");
var cors = require("cors");

// Rutas
const users = require("./routes/users.routes");
const files = require("./routes/upload-file.routes");

// Express: núcleo del proyecto
const app = express();

// Cors
app.use(cors());

// Configuraciones
app.set("port", 3000);
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Middlewares
app.use(morgan("dev"));

// Configuramos para consumo de la API
app.use(
    fileUpload({
        useTempFiles: true, // Archivos temporales: manejo de archivo grande
        tempFileDir: "/tmp", // Directorio de almacén para item anterior
        limits: { fileSize: 50 * 1024 * 1024 }, // Límite de tamaño: 50MB
        createParentPath: true, // Si no existe destino, lo crea
    })
)

// Dirección de rutas
app.use(/* Routes */ users, files);

// Exportamos
module.exports = app;