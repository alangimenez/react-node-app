const express = require('express');
const router = express.Router();
const expenseService = require('../services/expenseService');

router.get('/', async (req, res) => {
    const result = await expenseService.getAll()
    res.status(200).json(result)
})

module.exports = router