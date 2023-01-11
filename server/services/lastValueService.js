const lastValueRepository = require('../repository/daos/lastValueDao.js');
const tirRepository = require('../repository/daos/tirDao');

class LastValueService {
    constructor() {}

    async deleteAll() {
        await lastValueRepository.eliminarTodos()
    }

    async deleteByBondName(bondName) {
        await lastValueRepository.eliminarPorBondname(bondName)
    }

    async saveInfo(response) {
        let arrayQuotes;
        if (typeof(response) == 'string') {
            arrayQuotes = JSON.parse(response)
        } else {
            arrayQuotes = response
        }

        const bonds = await lastValueRepository.leerInfo()

        for (let i = 0; i < arrayQuotes.length; i++) {
            const indexBond = bonds.findIndex((e) => e.bondName == arrayQuotes[i].bondName)

            if (indexBond > 0) {
                // TODO: change info that exists in DB
            } else {
                arrayQuotes[i].lastPrice = arrayQuotes[i].lastPrice.replace(".","")
                arrayQuotes[i].lastPrice = arrayQuotes[i].lastPrice.replace(",",".")
                arrayQuotes[i].value = arrayQuotes[i].value.replace(".","")
                arrayQuotes[i].value = arrayQuotes[i].value.replace(",",".")
                arrayQuotes[i].volumen = arrayQuotes[i].volumen.replace(".","")
                arrayQuotes[i].volumen = arrayQuotes[i].volumen.replace(",",".")
                quote = new Quote(
                    arrayQuotes[i].name,
                    hoy.toLocaleDateString(),
                    hoy.toLocaleTimeString(),
                    parseFloat(arrayQuotes[i].value),
                    parseFloat(arrayQuotes[i].lastPrice),
                    parseFloat(arrayQuotes[i].volumen)
                )
    
                // guardado de información
                lastValueRepository.subirInfo(quote)
            }
        }
        return {"message": "ok"}
    }

    async getInfoByBondName(bondName) {
        return await lastValueRepository.leerInfoPorBondname(bondName)
    }

    async getAll() {
        let lastValues = await lastValueRepository.leerInfo()

        let response = []
        for (let i = 0; i < lastValues.length; i++) {
            response.push({
                bondName: lastValues[i].bondName,
                date: lastValues[i].date,
                time: lastValues[i].time,
                lastPrice: +lastValues[i].lastPrice.toString(),
                closePrice: +lastValues[i].closePrice.toString(),
                volume: +lastValues[i].volume.toString()
            })
        }
        return response
    }

    async getQuotesWithTir() {
        const quotes = await lastValueRepository.leerInfo();
        const tir = await tirRepository.leerInfo();
        const quotesResponse = []
        for (let i = 0; i < quotes.length; i++) {
            const index = tir.findIndex((e) => e.bondName == quotes[i].bondName);
            if (index > 0) {
                quotesResponse.push({
                    ...quotes[i],
                    "tir": tir[index].tir
                })
            }
        }
        return quotesResponse
    }
}

const lastValueService = new LastValueService()

module.exports = lastValueService