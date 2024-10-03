const { request, response } = require("express");

const { getConnection } = require("../database/database");

/**
 * @description Función encargada de obtener y registrar pagos
 * @param {*} req Request de la petición
 * @param {*} res Respuesta de la petición
 */

// Método para obtener pagos existentes
const getPayments = async (req = request, res = response) => {
    try {
        // Obtenemos conexión con la base de datos
        const connection = await getConnection();

        const [rows] = await connection.query("SELECT * FROM pagos");

        // Se aprueba. 200: OK
        res.status(200).json({ ok: true, payments: rows });
    } catch (e) {
        console.log(e);

        // No se aprueba. 500: internal_server_error
        res.status(500).json({ ok: false, e, msg: "Error del servidor" });
    }
};

// Método para registrar pagos
const registerPayment = async (req = request, res = response) => {
    // Obtenemos pagos y los destructuramos en objeto dentro de constante "payment"
    const payment = { ...req.body };

     // Si no existe el pago, se mostrará error 401: no autorizado
     if (!payment) return res.status(401).json({ ok: false, msg: "No autorizado" });

     try {
         const connection = await getConnection();
 
         const result = await connection.query("INSERT INTO pagos SET ?", payment);
 
         // Se aprueba. 201: created
         res.status(201).json({ ok: true, result, msg: "Pago registrado exitosamente" });
     } catch (e) {
         console.log(e);
 
         // No se aprueba. 500: internal_server_error
         res.status(500).json({ ok: false, e, msg: "Error del servidor" });
     }
};

// Exportamos pagos registrados
module.exports = { getPayments, registerPayment };