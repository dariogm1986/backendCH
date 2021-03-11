const { Schema, model } = require('mongoose');

const CatOcupacionalSchema = Schema({
    catocupacional: {
        type: String,
        required: true,
        unique: true
    }
}); 

//Para que no me muestre el __v cuando devuelvo la unidad
CatOcupacionalSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('CatOcupacional', CatOcupacionalSchema);