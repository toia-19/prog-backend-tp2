const { v4: uuidv4 } = require("uuid");
const path = require ("path");

// Extensiones de archivo permitidas
const extension = ["jpg", "jpeg", "png", "gif", "bpm", "svg"];

/**
 * @param { file to be upload } fileToUpload Permite cargar archivos
 * @param { extension accepted } extension array: string
 * @param { path where the file going to be save (in the server) } pathLocation string
 * @returns string fileName
*/

// La constante recibe como parametro el archivo en sí
const uploadFiles = ( fileToUpload ) => {
    return new Promise ((resolve, rejected) => {
        const { file } = fileToUpload; // Obtiene el archivo
        const extensionAndName = file.name.split(".") // Obtiene extensión y nombre de archivo
        const extension = extensionAndName[extensionAndName.lenght - 1] // Sólo obtiene la extensión

        // Verificamos que respete extensiones definidas previamente
        if (!extension.includes(extension)) {
            return rejected({mgs: `Allowed extension: ${extension}`});
        }

        const tempName = uuidv4() + "." + extension; // Crea UUID para el archivo
        const uploadPath = path.join(__dirname, "../uploads/", tempName); // Ubicación archivo

        file.mv(uploadPath, function (error){
            if (error) {
                // Rechazo en promesa en caso de falla
                rejected (error);
            }

            // Retorna nombre de archivo temporal + extensión
            resolve (tempName);
        })
    })
}

// Exportamos archivos subidos
module.exports = { uploadFiles };