const { response } = require('express');

const Integracion = require('../models/integracion');

const getIntegracion = async (req, res)=>{

    const desde = Number(req.query.desde) || 0; //para recoger donde comienza la paginacion

    const [ integracion, total ] = await Promise.all([
        Integracion
            .find()
            .skip( desde )
            .limit( 5 ),

            Integracion.countDocuments()
    ]);

    res.json({
        ok:true,
        integracion
    });
}

//devolver Integracion
const getIntegracionId = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el usuario
        const integracionDB = await Integracion.findById(_id);
        
        if(!integracionDB){
            return res.status(404).json({
                ok: false,
                msg: 'La Integracion con ese id no existe'
            });
        }
        res.json({
            ok: true,
            integracionDB
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }

}

//Crear Integracion
const crearIntegracion = async (req, res = response) => {
    //hacer el destructurin para obtener los daos que vienen del body
    const { integracion } = req.body;

    try {
        //validar si la TipoEmpleado existe
        const existeNombre = await Integracion.findOne({integracion});
        if(existeNombre){
            return res.status(400).json({
                ok: false,
                msg: 'La Integracion ya existe'
            });
        }

        const integracionaux = Integracion(req.body);

        await integracionaux.save();

        res.json({
            ok: true,
            integracionaux
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Actualizar Integracion
const actualizarIntegracion = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el Integracion
        const integracionDB = await Integracion.findById(_id);
        if(!integracionDB){
            return res.status(404).json({
                ok: false,
                msg: 'La Integracion con ese id no existe'
            });
        }

        const campos = req.body;

        
        //Actualizo la Servicio
        const integracionActualizado = await Integracion.findByIdAndUpdate(_id, campos, {new:true});

        res.json({
            ok: true,
            integracion: integracionActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Borrar Integracion
const borrarIntegracion = async (req, res = response) => {
    const _id = req.params.id;
    try {
        //Obtener la Integracion
        const integracionDB = await Integracion.findById(_id);
        if(!integracionDB){
            return res.status(404).json({
                ok: false,
                msg: 'La Integracion con ese id no existe'
            });
        }

        //Borrar la Integracion
        await Integracion.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: 'Integracion Eliminada'
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
    getIntegracion,
    getIntegracionId,
    crearIntegracion,
    actualizarIntegracion,
    borrarIntegracion
}

