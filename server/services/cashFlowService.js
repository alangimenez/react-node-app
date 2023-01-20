const Cashflow = require('../models/database/cashflowMg')
const cashFlowRepository = require('../repository/daos/cashflowDao')
const moment = require('moment'); // require
moment().format();


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

    async getAllCashFlowSorted() {

        // TODO: consider actual quantity in portfolio
        // TODO: add how many days are between today and dateInterest
        // TODO: create an util for dates

        const cashFlows = await cashFlowRepository.leerInfo()
        const flowOfInterest = []

        cashFlows.map((bond) => {
            for (let i = 0; i < bond.dateInterest.length; i++) {
                const [year, month, day] = bond.dateInterest[i].split('/')
                flowOfInterest.push({
                    "bondName": bond.bondName,
                    "dateInterest": new Date(+year, +month -1, +day),
                    "amountInterest": bond.amountInterest[i]
                })
            }
        })

        flowOfInterest.sort((a, b) => a.dateInterest - b.dateInterest)
        flowOfInterest.map((interest) => {
            interest.dateInterest = interest.dateInterest.toLocaleDateString()
        })

        return (flowOfInterest)
    }
}

const cashFlowService = new CashFlowService()

module.exports = cashFlowService