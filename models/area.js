const { Schema, model } = require('mongoose');

const AreaSchema = Schema({
    area: {
        type: String,
        required: true
    },
    tipoarea: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'TipoArea'
    },
    sistemapago: {
        type: Schema.Types.ObjectId,
        ref: 'SistemaPago'
    },
    unidad: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Unidad'
    }
},{ collection: 'areas' }); //Esta linea es para ponerle ese nombre en la BD

//Para que no me muestre el __v cuando devuelvo la Area
AreaSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Area', AreaSchema);