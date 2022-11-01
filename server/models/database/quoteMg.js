const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const coleccion = 'quotes';

const quotesSchema = new Schema ({
    bondName: {type: String},
    date: {type: String},
    time: {type: String},
    lastPrice: {type: mongoose.Types.Decimal128},
    closePrice: {type: mongoose.Types.Decimal128},
    volume: {type: mongoose.Types.Decimal128}
})

const Quotes = mongoose.model(coleccion, quotesSchema);

module.exports = Quotes;