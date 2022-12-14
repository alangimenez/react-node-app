require('dotenv').config();
const express = require("express");
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const quotesRouter = require('./router/quotesRouter');

// Hacer que node sirva los archivos de nuestro app React
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.json());

// Manejar las peticiones GET en la ruta /api
app.get("/api", (req, res) => {
    res.json({ message: "Hola desde el servidor!" });
});

app.post("/api", (req, res) => {
    // console.log(JSON.parse(req.body.title))
    res.json({ message: req.body });
});

// Todas las peticiones GET que no hayamos manejado en las líneas anteriores retornaran nuestro app React
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.use('/quotes', quotesRouter)

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});