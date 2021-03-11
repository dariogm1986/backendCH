const { Schema, model } = require('mongoose');

const MunicipioSchema = Schema({
    municipio: {
        type: String,
        required: true
    },
    provincia: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Provincia'
    }
},{ collection: 'municipios' }); //Esta linea es para ponerle ese nombre en la BD

//Para que no me muestre el __v cuando devuelvo la Municipio
MunicipioSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Municipio', MunicipioSchema);