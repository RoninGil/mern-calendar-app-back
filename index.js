const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

console.log(process.env);
//Create expresss server

const app = express();

//Database
dbConnection();

//CORS
app.use(cors())

//directorio publico
app.use(express.static('public')); //utiliza la carpeta "public" para mostrar informacion al entrar a la ruta "/"

//Lectura y parseo del body
app.use(express.json());

//Rutas

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//escuchar peticiones

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})