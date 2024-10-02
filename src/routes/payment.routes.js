const { Router } = require("express");

// Métodos pertenecientes a los pagos
const methods = require("../controllers/payment.controller");

// Token
const { authenticateJWT } = require("../middlewares/jwt");

const router = Router();

// Rutas definidas para acciones en pagos
router.post("/payment/register", methods.registerPayment);

// Exportación de rutas
module.exports = router;