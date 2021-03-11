const { Schema, model } = require('mongoose');

const EmpresaSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    reup: {
        type: String,
        required: true,
        unique: true
    },
    nit: {
        type: String,
        required: true,
        unique: true
    },
    director: {
        type: String,
        required: true,
        unique: true
    },
    direccion: {
        type: String
    },
    telefono: {
        type: String
    },
    email: {
        type: String,
        unique: true
    }
});

//Para que no me muestre el __v cuando devuelvo la empresa
EmpresaSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Empresa', EmpresaSchema);