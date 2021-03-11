const { Schema, model } = require('mongoose');

const GradoCientificoSchema = Schema({
    gradocientifico: {
        type: String,
        required: true,
        unique: true
    }
}); 

//Para que no me muestre el __v cuando devuelvo la unidad
GradoCientificoSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('GradoCientifico', GradoCientificoSchema);