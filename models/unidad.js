const { Schema, model } = require('mongoose');

const UnidadSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    reup: {
        type: String,
        required: true,
        unique: true
    },
    nit: {
        type: String,
        required: true,
        unique: true
    },
    director: {
        type: String,
        required: true,
        unique: true
    },
    direccion: {
        type: String
    },
    telefono: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    empresa: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Empresa'
    }
},{ collection: 'unidades' }); //Esta linea es para ponerle ese nombre en la BD

//Para que no me muestre el __v cuando devuelvo la unidad
UnidadSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Unidad', UnidadSchema);