const http = require("http");
const express = require ("express");
const app = express ();

// Prueba de respuesta esperada de un USUARIO
app.get("/user", (req, res) => {
    res.status(200).json([
        { 
            id_user: 1, 
            email: "admin@gmail.com",
            rol: "admin",
            contrasena: "",
            nombre: "Admin"
        }
    ])
})

// Prueba de respuesta esperada de un PAGO
app.get("/payment", (req, res) => {
    res.status(200).json([
        { 
            id_pago: 1, 
            descripcion: "Pago de cuota de luz",
            monto: 1200,
            activo: true,
            fecha_carga: "2024-10-10",
            fecha_pago: "2024-10-10",
            fecha_baja: "0000-00-00"
        }
    ])
})

// Iniciar el servidor
const server = http.createServer(app);

server.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});