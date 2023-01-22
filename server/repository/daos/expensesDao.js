const { CrudMongo } = require('../crud/crud');
const expenseModel = require('../../models/database/expenseMg');
// const { ErrorHandler } = require('../../../error/error');
// const error = new ErrorHandler();

class expenseDao extends CrudMongo {
    constructor() {
        super(expenseModel)
    }

}

let expenseSingleton = new expenseDao()

module.exports = expenseSingleton