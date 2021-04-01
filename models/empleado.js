const { Schema, model } = require('mongoose');

const EmpleadoSchema = Schema({
    carne: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    estadocivil: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'EstadoCivil'
    },
    raza: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Raza'
    },
    sexo: {
        type: String,
        require: true
    },
    direccion: {
        type: String
    },
    telefono: {
        type: String
    },
    pais: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Pais'
    },
    provincia: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Provincia'
    },
    municipio: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Municipio'
    },
    calzado: {
        type: String
    },
    camisa: {
        type: String
    },
    pantalon: {
        Types: String
    },
    niveleducacional: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'NivelEducacional' 
    },
    fechagraduado: {
        type: Date
    },
    carrera: {
        type: Schema.Types.ObjectId,
        ref: 'Carrera' 
    },
    especialidad: {
        type: Schema.Types.ObjectId,
        ref: 'Especialidad' 
    },
    gradocientifico: {
        type: Schema.Types.ObjectId,
        ref: 'GradoCientifico' 
    },
    empresa: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Empresa' 
    },
    unidad: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Unidad'
    },
    area: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Area'
    },
    tipoempleado: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'TipoEmpleado'
    },
    cargo: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Cargo'
    },
    numempleado: {
        type: String,
        require: true
    },
    integracion: {
        type: Array
    },
    defensa: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Defensa'
    },
    fechacontrato: {
        type: Date
    },
    fechainicio: {
        type: Date
    }
},{ collection: 'empleados' }); //Esta linea es para ponerle ese nombre en la BD

//Para que no me muestre el __v cuando devuelvo la Area
EmpleadoSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Empleado', EmpleadoSchema);