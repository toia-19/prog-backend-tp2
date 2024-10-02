const jwt = require("jsonwebtoken");
const config = require("../config");
const { response, request, next } = require("express");

const authenticateJWT = (req = request, res = response, next = next) => {
    // authorization: contiene el token
    const authHeader = req.headers["authorization"];

    /*
        Hacemos un split para dividir el token del segundo index obtenido
        desde el array, el cual contiene el dato
    */
    const token = authHeader && authHeader.split(" ")[1];

    // Si no se reconoce un token, devolverá error 401
    if (token == null) return res.sendStatus(401);

    // verify: verifica el token y la "firma" de la BD
    jwt.verify(token, config.secretKey, (err, user) => {
        // 
        if (err) return res.sendStatus(403);
        
        // Guarda al usuario en el request para usar en rutas protegidas
        req.user = user;
        
        // Pasamos al siguiente middleware o ruta
        next();
    })
}

// Gestionamos el creado del token, como párametro solicitamos al usuario
const generateJwt = async (user) => {
    // Generamos el paylaod con la información del usuario
    const payload = {
        id_user: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
        contrasena: user.contrasena
    }

    // Le damos una validez al token de 24 horas
    const options = {
        expiresIn: "24h",
    }

    return jwt.sign(payload, config.secretKey, options);
}

// Verificar rol obtenido
const verifyRole = (requiredRole) => {
    return (req, res, next) => {
        // Extracción del token del encabezado de autorización
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        // Si no se obtiene un token, ejecutará status '401' -> acceso denegado
        if (!token) {
            return res.status(401).json({ msg: "Acceso denegado." });
        }

        // Se valida el token y se decodifica
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            // Se verifica que el rol del usuario sea el requerido
            if (req.user.rol !== requiredRole) {
                return res.status(403).json({ msg: "Acceso denegado. Permisos insuficientes." });
            }

            // Pasa al siguiente middleware
            next();
        // Manejo de errores encapsulado en bloque 'catch'
        } catch (error) {
            res.status(400).json({ msg: "Token inválido." });
        }
    };
};

// Exportamos validación del token
module.exports = { authenticateJWT, generateJwt, verifyRole };