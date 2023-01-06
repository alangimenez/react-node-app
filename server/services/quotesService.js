const quotesRepository = require('../repository/daos/quotesDao')
const lastValueService = require('./lastValueService.js')
const Quote = require('../models/quote');

class QuotesService {
    constructor() { }

    async deleteAllQuotesByBondName(bondName) {
        return await quotesRepository.eliminarTodos(bondName);
    }

    async saveInfo(arrayQuotes) {
        // parsea respuesta
        const arrayQuotesJson = JSON.parse(arrayQuotes)

        // elimina todos los registros anteriores en lastValue collection
        // TODO: debe grabar los datos si antes no estaban en la colección, o actualizarlo si ya existian
        // await lastValueService.deleteAll()

        // armado de información a guardar
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        let quotee = {}
        for (let i = 0; i < arrayQuotesJson.length; i++) {
            let bond = await lastValueService.getInfoByBondName(arrayQuotes[i].name)
            console.log(bond)
            if (bond.length > 0) {
                // TODO: reasignar datos del bono y volver a guardarlo
            } else {
                console.log(arrayQuotesJson)
                arrayQuotesJson[i].lastPrice = arrayQuotesJson[i].lastPrice.replace(".","")
                arrayQuotesJson[i].lastPrice = arrayQuotesJson[i].lastPrice.replace(",",".")
                arrayQuotesJson[i].value = arrayQuotesJson[i].value.replace(".","")
                arrayQuotesJson[i].value = arrayQuotesJson[i].value.replace(",",".")
                arrayQuotesJson[i].volumen = arrayQuotesJson[i].volumen.replace(".","")
                arrayQuotesJson[i].volumen = arrayQuotesJson[i].volumen.replace(",",".")
                let quote = new Quote(
                    arrayQuotesJson[i].name,
                    hoy.toLocaleDateString(),
                    hoy.toLocaleTimeString(),
                    parseFloat(arrayQuotesJson[i].value),
                    parseFloat(arrayQuotesJson[i].lastPrice),
                    parseFloat(arrayQuotesJson[i].volumen)
                )
    
                // guardado de información
                lastValueService.saveInfo(quote)
                quotee = quote
            }
            quotesRepository.subirInfo(quotee);
        }
        return {"message": "ok"}
    }
}

const quotesService = new QuotesService()

module.exports = quotesService