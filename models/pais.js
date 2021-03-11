const { Schema, model } = require('mongoose');

const PaisSchema = Schema({
    pais: {
        type: String,
        required: true,
        unique: true
    }
}); 

//Para que no me muestre el __v cuando devuelvo la unidad
PaisSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Pais', PaisSchema);