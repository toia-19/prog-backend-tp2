const { Router } = require("express");

// Métodos perteneciente a los archivos
const methods = require("../controllers/file.controller");

// Token
const { authenticateJWT } = require("../middlewares/jwt");

const router = Router();

// Rutas definidas para acciones en pagos
router.post("/file/upload", methods.uploadFiles);

// Exportación de rutas
module.exports = router;