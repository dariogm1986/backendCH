const { Schema, model } = require('mongoose');

const ProvinciaSchema = Schema({
    provincia: {
        type: String,
        required: true
    },
    pais: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Pais'
    }
},{ collection: 'provincias' }); //Esta linea es para ponerle ese nombre en la BD

//Para que no me muestre el __v cuando devuelvo la Provincia
ProvinciaSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Provincia', ProvinciaSchema);