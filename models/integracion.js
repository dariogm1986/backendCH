const { Schema, model } = require('mongoose');

const IntegracionSchema = Schema({
    integracion: {
        type: String,
        required: true,
        unique: true
    }
}); 

//Para que no me muestre el __v cuando devuelvo la unidad
IntegracionSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Integracion', IntegracionSchema);