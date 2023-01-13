const { CrudMongo } = require('../crud/crud');
const lastValue = require('../../models/database/lastValueMg.js');
// const { ErrorHandler } = require('../../../error/error');
// const error = new ErrorHandler();

class lastValueDao extends CrudMongo {
    constructor() {
        super(lastValue)
    }

    /* async eliminarTodos(bondName) {
        try {
            const result = await this.model.deleteMany();
            return this.leerInfo();
        } catch (e) {
            logger.error('cant eliminar info')
            // return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message, res);
        }
    } */

    async modifyValues(bond) {
        try {
            console.log(bond)
            const result = await this.model.updateOne({bondName: bond.bondName}, {$set: {closePrice: bond.closePrice, lastPrice: bond.lastPrice, volume: bond.volumen}})
            return result
        } catch (e) {
            logger.error("Can't delete info in modifyValues")
        }
    }
}

let lastValueSingleton = new lastValueDao()

module.exports = lastValueSingleton