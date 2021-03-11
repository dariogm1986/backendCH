const { response } = require('express');

const EstadoCivil = require('../models/estadocivil');

const getEstadoCivil = async (req, res)=>{

    const desde = Number(req.query.desde) || 0; //para recoger donde comienza la paginacion

    const [ estadocivil, total ] = await Promise.all([
        EstadoCivil
            .find()
            .skip( desde )
            .limit( 5 ),

            EstadoCivil.countDocuments()
    ]);

    res.json({
        ok:true,
        estadocivil
    });
}

//devolver EstadoCivil
const getEstadoCivilId = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el usuario
        const estadoCivilDB = await EstadoCivil.findById(_id);
        
        if(!estadoCivilDB){
            return res.status(404).json({
                ok: false,
                msg: 'El Estado Civil con ese id no existe'
            });
        }
        res.json({
            ok: true,
            estadoCivilDB
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }

}

//Crear EstadoCivil
const crearEstadoCivil = async (req, res = response) => {
    //hacer el destructurin para obtener los daos que vienen del body
    const { estadocivil } = req.body;

    try {
        //validar si la TipoEmpleado existe
        const existeNombre = await EstadoCivil.findOne({estadocivil});
        if(existeNombre){
            return res.status(400).json({
                ok: false,
                msg: 'El Estado Civil ya existe'
            });
        }

        const estadoCivilInsert = EstadoCivil(req.body);

        await estadoCivilInsert.save();

        res.json({
            ok: true,
            estadoCivilInsert
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Actualizar EstadoCivil
const actualizarEstadoCivil = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el EstadoCivil
        const estadoCivilDB = await EstadoCivil.findById(_id);
        if(!estadoCivilDB){
            return res.status(404).json({
                ok: false,
                msg: 'El Estado Civil con ese id no existe'
            });
        }

        const campos = req.body;

        
        //Actualizo la Servicio
        const estadoCivilActualizado = await EstadoCivil.findByIdAndUpdate(_id, campos, {new:true});

        res.json({
            ok: true,
            estadoCivil: estadoCivilActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Borrar EstadoCivil
const borrarEstadoCivil = async (req, res = response) => {
    const _id = req.params.id;
    try {
        //Obtener la EstadoCivil
        const estadoCivilDB = await EstadoCivil.findById(_id);
        if(!estadoCivilDB){
            return res.status(404).json({
                ok: false,
                msg: 'El Estado Civil con ese id no existe'
            });
        }

        //Borrar la EstadoCivil
        await EstadoCivil.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: 'Estado Civil Eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

module.exports = {
    getEstadoCivil,
    getEstadoCivilId,
    crearEstadoCivil,
    actualizarEstadoCivil,
    borrarEstadoCivil
}

