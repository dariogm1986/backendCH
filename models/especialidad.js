const { Schema, model } = require('mongoose');

const EspecialidadSchema = Schema({
    especialidad: {
        type: String,
        required: true,
        unique: true
    }
}); 

//Para que no me muestre el __v cuando devuelvo la unidad
EspecialidadSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Especialidad', EspecialidadSchema);