const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const coleccion = 'investments';

const investmentSchema = new Schema ({
    name: {type: String},
    ticket: {type: String},
    purchaseDate: {type: String},
    quantity: {type: mongoose.Types.Decimal128},
    purchasePrice: {type: mongoose.Types.Decimal128},
    currency: {type: String},
    assetType: {type: String},
    operation: {type: String}
})

const Investment = mongoose.model(coleccion, investmentSchema);

module.exports = Investment;