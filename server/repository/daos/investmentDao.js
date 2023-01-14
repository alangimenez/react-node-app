const { CrudMongo } = require('../crud/crud');
const investmentModel = require('../../models/database/investmentMg');
// const { ErrorHandler } = require('../../../error/error');
// const error = new ErrorHandler();

class investmentDao extends CrudMongo {
    constructor() {
        super(investmentModel)
    }
}

let investmentSingleton = new investmentDao()

module.exports = investmentSingleton