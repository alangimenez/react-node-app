const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const coleccion = 'investments';

const investmentSchema = new Schema ({
    name: {type: String},
    ticket: {type: String},
    purchaseDate: {type: String},
    purchaseQuantity: {type: mongoose.Types.Decimal128},
    purchasePrice: {type: mongoose.Types.Decimal128},
    currency: {type: String},
    assetType: {type: String},
    operation: {type: String},
    actualQuantity: {type: mongoose.Types.Decimal128},
    commission: {type: mongoose.Types.Decimal128}
})

const Investment = mongoose.model(coleccion, investmentSchema);

module.exports = Investment;