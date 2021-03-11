const { Schema, model } = require('mongoose');

const DefensaSchema = Schema({
    defensa: {
        type: String,
        required: true,
        unique: true
    }
}); 

//Para que no me muestre el __v cuando devuelvo la unidad
DefensaSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Defensa', DefensaSchema);