const { Router } = require("express");

// Métodos pertenecientes a los usuarios
const methods = require("../controllers/user.controller");

// Token
const { authenticateJWT } = require("../middlewares/jwt");

const router = Router();

// Ruta definida para registrar usuarios -> POST
router.post("/user/register", methods.registerUser);

// Ruta definida para loguear usuarios -> POST
router.post("/user/login", methods.loginUser);

// Ruta definida para obtener usuarios por ID -> GET
router.get("/user/:id", authenticateJWT, methods.getOne);

// Exportación de rutas
module.exports = router;