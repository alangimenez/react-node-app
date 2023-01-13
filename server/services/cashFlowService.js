const Cashflow = require('../models/database/cashflowMg')
const cashFlowRepository = require('../repository/daos/cashflowDao')

class CashFlowService {
    constructor() {}
    async getCashFlow(bondName) {
        return await cashFlowRepository.leerInfoPorBondname(bondName)
    }

    async saveCashFlow(cashFlow) {
        return await cashFlowRepository.subirInfo({
            "bondName": cashFlow.bondName,
            "company": cashFlow.company,
            "start": cashFlow.start,
            "finish": cashFlow.finish,
            "rate": cashFlow.rate,
            "dateInterest": cashFlow.dateInterest,
            "amountInterest": cashFlow.amountInterest
        })
    }
}

const cashFlowService = new CashFlowService()

module.exports = cashFlowService