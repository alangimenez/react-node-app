require('dotenv').config();
const express = require("express");
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const quotesRouter = require('./router/quotesRouter');
const lastValueRouter = require('./router/lastValueRouter');
const tirRouter = require('./router/tirRouter');
const cashflowRouter = require('./router/cashFlowRouter');
const pruebaRouter = require('./router/pruebaRouter');
const investmentRouter = require('./router/investmentRouter');
const midSecurity = require('./middlewares/security')

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

app.use('/quotes' , quotesRouter)
app.use('/lastvalue',lastValueRouter)
app.use('/tir', tirRouter)
app.use('/cashflow', cashflowRouter)
app.use('/prueba', pruebaRouter)
app.use('/investment', investmentRouter)

// Todas las peticiones GET que no hayamos manejado en las líneas anteriores retornaran nuestro app React
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});