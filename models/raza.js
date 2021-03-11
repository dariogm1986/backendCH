const { Schema, model } = require('mongoose');

const RazaSchema = Schema({
    raza: {
        type: String,
        required: true,
        unique: true
    }
}); 

//Para que no me muestre el __v cuando devuelvo la unidad
RazaSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Raza', RazaSchema);