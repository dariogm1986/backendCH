const { Schema, model } = require('mongoose');

const CoeficienteSchema = Schema({
    coeficiente: {
        type: String,
        required: true,
        unique: true
    },
    valor: {
        type: String,
        required: true
    }
}); 

//Para que no me muestre el __v cuando devuelvo la unidad
CoeficienteSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Coeficiente', CoeficienteSchema);