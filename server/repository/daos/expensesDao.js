const { CrudMongo } = require('../crud/crud');
const expenseModel = require('../../models/database/expenseMg');
// const { ErrorHandler } = require('../../../error/error');
// const error = new ErrorHandler();

class expenseDao extends CrudMongo {
    constructor() {
        super(expenseModel)
    }

    async getExpensesFilterByDate (date) {
        try {
            const result = await this.model.find({date: { $gt: new Date(date)}}, { __v: 0 })
            return result;
        } catch (e) {
            console.log(e.message)
        }
    }

    async getLastTenExpenses () {
        try {
            const result = await this.model.find().sort({$natural:-1}).limit(3)
            return result;
        } catch (e) {
            console.log(e.message)
        }
    }

}

let expenseSingleton = new expenseDao()

module.exports = expenseSingleton