//importaciones
require('dotenv').config();  //Para leer las variables de entorno
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Crea el servidor de express
const app = express();

//Configurar Cors
app.use(cors());

// Lectura y parseo del body (Middlewares)
app.use( express.json() );

//Conexion a la BD
dbConnection();

//Rutas
app.use('/api/empresa', require('./routes/empresas'));
app.use('/api/unidades', require('./routes/unidades'));
app.use('/api/tipoarea', require('./routes/tipoarea'));
app.use('/api/tipoempleado', require('./routes/tipoempleado'));
app.use('/api/catocupacional', require('./routes/catocupacional'));
app.use('/api/integracion', require('./routes/integracion'));
app.use('/api/raza', require('./routes/raza'));
app.use('/api/estadocivil', require('./routes/estadocivil'));
app.use('/api/pais', require('./routes/pais'));
app.use('/api/gradocientifico', require('./routes/gradocientifico'));
app.use('/api/niveleducacional', require('./routes/niveleducacional'));
app.use('/api/carrera', require('./routes/carrera'));
app.use('/api/especialidad', require('./routes/especialidad'));
app.use('/api/grupoescala', require('./routes/grupoescala'));
app.use('/api/coeficiente', require('./routes/coeficiente'));
app.use('/api/provincia', require('./routes/provincia'));
app.use('/api/municipio', require('./routes/municipio'));
app.use('/api/sistemapago', require('./routes/sistemapago'));
app.use('/api/defensa', require('./routes/defensa'));
app.use('/api/area', require('./routes/area'));
app.use('/api/cargo', require('./routes/cargo'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


app.listen( process.env.PORT, ()=> {
    console.log("Servidor corriendo satisfactoriamente en puerto " + process.env.PORT);
});