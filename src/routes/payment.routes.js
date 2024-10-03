const { Router } = require("express");

// Métodos pertenecientes a los pagos
const methods = require("../controllers/payment.controller");

// Token
const { authenticateJWT } = require("../middlewares/jwt");

const router = Router();

// Ruta definida para obtener pagos existentes -> GET
router.get("/payment/read", methods.getPayments);

// Ruta definida para registrar pagos existentes -> POST
router.post("/payment/register", methods.registerPayment);

// Exportación de rutas
module.exports = router;