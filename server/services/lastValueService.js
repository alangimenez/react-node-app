const lastValueRepository = require('../repository/daos/lastValueDao.js')

class LastValueService {
    constructor() {}

    async deleteAll() {
        await lastValueRepository.eliminarTodos()
    }

    async saveInfo(lastValue) {
        await lastValueRepository.subirInfo(lastValue)
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
}

const lastValueService = new LastValueService()

module.exports = lastValueService