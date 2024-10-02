const { request, response } = require("express");

const { getConnection } = require("../database/database");

// Encriptación
const bcrypt = require("bcrypt");

const { generateJwt } = require("../middlewares/jwt");

/**
 * @description Función encargada de gestionar el registro y login del usuario
 * @param {*} req Request de la petición
 * @param {*} res Respuesta de la petición
 */

// Pasamos request del cliente, como el response del servidor
const getOne = async (req = request, res = response) => {
    // Solicitamos por párametro del request, el ID:
    // const { id } = req.params; <- destructuración del objeto
    const id = req.params.id;

    console.log("Parámetros", req.params);

    console.log("ID provisto?", id);

    // Si el ID no es dado por el usuario, se mostrará un mensaje de error 404
    if (!id) {
        res.status(404).json({ ok: false, msg: "El parámetro no fue provisto" });
    }

    console.log("Paso el 404 Not Found");

    try {
        const connection = await getConnection();
        const [result] = await connection.query(
            "SELECT * FROM usuario WHERE id_user = ?", id
        );

        res.status(200).json({ ok: true, result, msg: "approved" });
    } catch (error) {
        console.error(e);
        res.status(500).json({ ok: false, msg: "Server error" });
    }
};

// REGISTRO
const registerUser = async (req = request, res = response) => {
    // Obtenemos al usuario y lo desestructuramos en constante "user"
    const user = { ...req.body };

    // Valor aleatorio para generar el hasheo
    const salt = 12;

    // Si no existe el usuario, se mostrará error 401: no autorizado
    if (!user) res.status(401).json({ ok: false, msg: "No autorizado" });

    try {
        // Si todo sale bien, se hashea la contrasela
        user.contrasena = await bcrypt.hash(user.contrasena, salt);

        const connection = await getConnection();

        const result = await connection.query("INSERT INTO usuario SET ?", user);

        // Se aprueba.201: created
        res.status(201).json({ ok: true, result, msg: "approved" });
    } catch (e) {
        console.log(e);

        // No se aprueba. 500: internal_server_error
        res.status(500).json({ ok: false, e, msg: "Server error" });
    }
};

// INICIO DE SESIÓN
const loginUser = async (req = request, res = response) => {
    const user = { ...req.body };

    // Si no existe el usuario, se mostrará error 401: no autorizado
    if (!user) res.status(401).json({ ok: false, msg: "No autorizado" });

    try {
        const connection = await getConnection();
        const [result] = await connection.query(
            "SELECT * FROM usuario WHERE id_user = ?",
            user.id_user
        );

        if (!result[0]) res.status(404).json({ ok: false, msg: "Usuario no encontrado" });

        console.log(user,result[0]);

        // Se compara la contraseña
        const isPassword = await bcrypt.compare(user.contrasena, result[0].contrasena);

        // Si la contraseña es correcta, genera el token
        if (isPassword) {
            const token = await generateJwt(result[0]);
            res.status(200).json({ ok: true, token, msg: "login" });
        } else {
            res.status(401).json({ ok: false, msg: "Contraseña incorrecta" });
        }
    
    // Capturamos posible error -> se devuelve con un status '500'
    } catch (e) {
        console.error(e);
        res.status(500).json({ ok: false, e, msg: "Server error" });
    }
};

// Exportación de usuario obtenido/ registrado/ logueado
module.exports = { registerUser, loginUser, getOne };