const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const coleccion = 'expense';

const expenseSchema = new Schema ({
    date: {type: String},
    account: {type: String},
    amount: {type: mongoose.Types.Decimal128}
})

const Expense = mongoose.model(coleccion, expenseSchema);

module.exports = Expense;