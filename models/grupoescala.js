const { Schema, model } = require('mongoose');

const GrupoEscalaSchema = Schema({
    grupoescala: {
        type: String,
        required: true,
        unique: true
    },
    salarioescala: {
        type: String,
        required: true
    }
}); 

//Para que no me muestre el __v cuando devuelvo la unidad
GrupoEscalaSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('GrupoEscala', GrupoEscalaSchema);