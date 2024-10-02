const { request, response } = require("express");

const { getConnection } = require("../database/database");

/**
 * @description Función encargada de registrar pagos
 * @param {*} req Request de la petición
 * @param {*} res Respuesta de la petición
 */

const registerPayment = async (req = request, res = response) => {
    const payment = { ...req.body };

    try {
        
    } catch (error) {
        
    }
}

module.exports = { registerPayment };