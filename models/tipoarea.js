const { Schema, model } = require('mongoose');

const TipoAreaSchema = Schema({
    tipoarea: {
        type: String,
        required: true,
        unique: true
    }
}); 

//Para que no me muestre el __v cuando devuelvo la unidad
TipoAreaSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('TipoArea', TipoAreaSchema);