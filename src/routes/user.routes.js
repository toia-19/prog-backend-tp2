const { Router } = require("express");

// Métodos pertenecientes a los usuarios
const methods = require("../controllers/user.controller");

// Token
const { authenticateJWT } = require("../middlewares/jwt");

const router = Router();

// Rutas definidas para acciones
router.post("/user/register", methods.registerUser);
router.post("/user/login", methods.loginUser);
router.get("/user/:id", authenticateJWT, methods.getOne);

// Exportación de rutas
module.exports = router;