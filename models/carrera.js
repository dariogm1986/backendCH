const { Schema, model } = require('mongoose');

const CarreraSchema = Schema({
    carrera: {
        type: String,
        required: true,
        unique: true
    }
}); 

//Para que no me muestre el __v cuando devuelvo la unidad
CarreraSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Carrera', CarreraSchema);