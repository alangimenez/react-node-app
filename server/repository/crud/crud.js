const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
// const { ErrorHandler } = require('../../error/error');
// const error = new ErrorHandler();

const { logger } = require('../../config/config.log4js');

(async () => {
    try {
        await mongoose.connect(uri);
        logger.info('database connected')
    } catch (e) {
        logger.error('database not connected. Error: ' + e)
        // return error.errorProcess("CRUD Error", `La conexión a la base de datos ha tenido un error -> ` + e.message, res);
    }
})();

class CrudMongo {
    // constructor
    constructor(model) {
        this.model = model;
    }

    // metodos
    async leerInfo() {
        try {
            const informacion = await this.model.find({}, { __v: 0 });
            return informacion;
        } catch (e) {
            logger.error('cant leer info')
            // return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message, res);
            // errorLogger.error(`Ocurrio un error en leerinfo CRUD -> ` + e.message);
            // throw new Error(`Ocurrio un error en leerInfo CRUD -> ` + e.message)
        }
    }

    async leerInfoPorId(id) {
        try {
            return await this.model.find({ id: id }, { __v: 0 });
        } catch (e) {
            logger.error('cant leer info por id')
            // return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message);
        }
    }

    async leerInfoPorBondname(bondName) {
        try {
            return await this.model.find({ bondName: bondName }, { __v: 0 });
        } catch (e) {
            logger.error('cant leer info por id')
            // return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message);
        }
    }

    async subirInfo(objeto) {
        try {
            let nuevoObjeto = await this.model.create(objeto);
            return nuevoObjeto
        } catch (e) {
            logger.error('cant subir info' + e)
            // return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message, res);
        }
    }

    async eliminarInfo(bondName) {
        try {
            const result = await this.model.deleteOne({ bondName: bondName });
            return this.leerInfo();
        } catch (e) {
            logger.error('cant eliminar info')
            // return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message, res);
        }
    }

    async eliminarTodos(bondName) {
        try {
            return await this.model.deleteMany({ bondName: bondName });
        } catch (e) {
            logger.error('cant eliminar info')
            // return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message, res);
        }
    }

    async actualizarInfo(objeto) {
        try {
            let resultado = "";
            if (objeto.nombre) resultado = await this.model.updateOne({ id: objeto.id }, { $set: { nombre: objeto.nombre } });
            if (objeto.codigo) resultado = await this.model.updateOne({ id: objeto.id }, { $set: { codigo: objeto.codigo } });
            if (objeto.descripcion) resultado = await this.model.updateOne({ id: objeto.id }, { $set: { descripcion: objeto.descripcion } });
            if (objeto.stock) resultado = await this.model.updateOne({ id: objeto.id }, { $set: { stock: objeto.stock } });
            if (objeto.foto) resultado = await this.model.updateOne({ id: objeto.id }, { $set: { foto: objeto.foto } });
            if (objeto.precio) resultado = await this.model.updateOne({ id: objeto.id }, { $set: { precio: objeto.precio } });
            if (objeto.timestamp) resultado = await this.model.updateOne({ id: objeto.id }, { $set: { timestamp: Date.now() } });
            if (objeto.categoria) resultado = await this.model.updateOne({ id: objeto.id }, { $set: { categoria: objeto.categoria } });
            return this.leerInfoPorId(objeto.id);
        } catch (e) {
            logger.error('cant actualizar info')
            // return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message, res);
        }
    }

    async actualizarInfoPrueba(id, parametros) {
        try {
            const result = await this.model.updateOne({id: id}, parametros);
            return await this.leerInfoPorId(id);
        } catch (e) {
            logger.error('cant actualizar info')
            // return error.errorProcess("CRUD Error", `El Crud ha tenido un error -> ` + e.message);
        }
    }
}

module.exports = { CrudMongo }