const { Schema, model } = require('mongoose');

const NivelEducacionalSchema = Schema({
    niveleducacional: {
        type: String,
        required: true,
        unique: true
    }
}); 

//Para que no me muestre el __v cuando devuelvo la unidad
NivelEducacionalSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('NivelEducacional', NivelEducacionalSchema);