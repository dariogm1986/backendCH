const { Schema, model } = require('mongoose');

const EstadoCivilSchema = Schema({
    estadocivil: {
        type: String,
        required: true,
        unique: true
    }
}); 

//Para que no me muestre el __v cuando devuelvo la unidad
EstadoCivilSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('EstadoCivil', EstadoCivilSchema);