const { response } = require('express');

const Raza = require('../models/raza');

const getRaza = async (req, res)=>{

    const desde = Number(req.query.desde) || 0; //para recoger donde comienza la paginacion

    const [ raza, total ] = await Promise.all([
        Raza
            .find()
            .skip( desde )
            .limit( 5 ),

            Raza.countDocuments()
    ]);

    res.json({
        ok:true,
        raza
    });
}

//devolver Raza
const getRazaId = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el usuario
        const razaDB = await Raza.findById(_id);
        
        if(!razaDB){
            return res.status(404).json({
                ok: false,
                msg: 'La Raza con ese id no existe'
            });
        }
        res.json({
            ok: true,
            razaDB
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }

}

//Crear Raza
const crearRaza = async (req, res = response) => {
    //hacer el destructurin para obtener los daos que vienen del body
    const { raza } = req.body;

    try {
        //validar si la TipoEmpleado existe
        const existeNombre = await Raza.findOne({raza});
        if(existeNombre){
            return res.status(400).json({
                ok: false,
                msg: 'La Raza ya existe'
            });
        }

        const razaInsert = Raza(req.body);

        await razaInsert.save();

        res.json({
            ok: true,
            razaInsert
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Actualizar Raza
const actualizarRaza = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el Raza
        const razaDB = await Raza.findById(_id);
        if(!razaDB){
            return res.status(404).json({
                ok: false,
                msg: 'La Raza con ese id no existe'
            });
        }

        const campos = req.body;

        
        //Actualizo la Servicio
        const razaActualizado = await Raza.findByIdAndUpdate(_id, campos, {new:true});

        res.json({
            ok: true,
            raza: razaActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Borrar Raza
const borrarRaza = async (req, res = response) => {
    const _id = req.params.id;
    try {
        //Obtener la Raza
        const razaDB = await Raza.findById(_id);
        if(!razaDB){
            return res.status(404).json({
                ok: false,
                msg: 'La Raza con ese id no existe'
            });
        }

        //Borrar la Raza
        await Raza.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: 'Raza Eliminada'
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
    getRaza,
    getRazaId,
    crearRaza,
    actualizarRaza,
    borrarRaza
}

