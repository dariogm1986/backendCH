const { Schema, model } = require('mongoose');

const CargoSchema = Schema({
    cargo: {
        type: String,
        required: true
    },
    catocupacional: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'CatOcupacional'
    },
    grupoescala: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'GrupoEscala'
    }
},{ collection: 'Cargos' }); //Esta linea es para ponerle ese nombre en la BD

//Para que no me muestre el __v cuando devuelvo la Cargo
CargoSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Cargo', CargoSchema);