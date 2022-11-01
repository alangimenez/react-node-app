const { CrudMongo } = require('../crud/crud');
const lastValue = require('../../models/database/lastValueMg.js');
// const { ErrorHandler } = require('../../../error/error');
// const error = new ErrorHandler();

class lastValueDao extends CrudMongo {
    constructor() {
        super(lastValue)
    }

    async eliminarTodos(bondName) {
        try {
            const result = await this.model.deleteMany();
            return this.leerInfo();
        } catch (e) {
            logger.error('cant eliminar info')
            // return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message, res);
        }
    }
}

let lastValueSingleton = new lastValueDao()

module.exports = lastValueSingleton