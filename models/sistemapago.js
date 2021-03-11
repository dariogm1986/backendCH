const { Schema, model } = require('mongoose');

const SistemaPagoSchema = Schema({
    sistemapago: {
        type: String,
        required: true,
        unique: true
    }
}); 

//Para que no me muestre el __v cuando devuelvo la unidad
SistemaPagoSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('SistemaPago', SistemaPagoSchema);