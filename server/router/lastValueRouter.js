const express = require('express');
const router = express.Router();
const lastValueService = require('../services/lastValueService');

router.get('/', async (req, res) => {
    const datos = await lastValueService.getAll()
    console.log(datos)
    res.status(200).json(datos)
})

module.exports = router