const { response } = require('express');
const bcrypt = require('bcryptjs');

const Provincia = require('../models/provincia');
const { generarJWT } = require('../helpers/jwt');

const getProvincia = async (req, res)=>{

    const desde = Number(req.query.desde) || 0; //para recoger donde comienza la paginacion

    const [ provincia, total ] = await Promise.all([
        Provincia
            .find()
            .populate('pais', 'pais'),

        Provincia.countDocuments()
    ]);

    res.json({
        ok:true,
        provincia
    });
}

//devolver Provincia por Id
const getProvinciaId = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el usuario
        const provinciaDB = await Promise.all([
            Provincia
                .findById(_id)
                .populate('pais', 'pais')
        ]);
        if(!provinciaDB){
            return res.status(404).json({
                ok: false,
                msg: 'Esta Provincia con ese id no existe'
            });
        }
        res.json({
            ok: true,
            provinciaDB
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }

}
//Devolver Provincias por paise
const getProvinciasPorPais = async (req, res = response)=>{

    //const pais = req.params.pais;
    const pais = req.body;

    const provincia = await Promise.all([
        Provincia.find({'pais': pais})
    ]);

    res.json({
        ok:true,
        provincia
    });
}

//Crear Provincia
const crearProvincia = async (req, res = response) => {
    //hacer el destructurin para obtener los daos que vienen del body
    const { provincia, pais } = req.body;

    try {
        //validar si la Provincia existe
        const existeProvincia = await Provincia.findOne({provincia});
        if(existeProvincia){
            return res.status(400).json({
                ok: false,
                msg: 'Esta Provincia ya existe'
            });
        }

        const provinciaInsert = Provincia(req.body);

        await provinciaInsert.save();

        res.json({
            ok: true,
            provinciaInsert
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Actualizar Provincia
const actualizarProvincia = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener la empresa
        const provinciaDB = await Provincia.findById(_id);
        if(!provinciaDB){
            return res.status(404).json({
                ok: false,
                msg: 'Este Provincia con ese id no existe'
            });
        }

        const { provincia, ...campos } = req.body;
        if(provinciaDB.provincia !== provincia){
            //validar si la Provincia existe
            const existeProvincia = await Provincia.findOne({provincia});
            if(existeProvincia){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe esta Provincia'
                });
            }
        }

        campos.provincia = provincia;
        //Actualizo la Provincia
        const provinciaActualizada = await Provincia.findByIdAndUpdate(_id, campos, {new:true});

        res.json({
            ok: true,
            provincia: provinciaActualizada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//BorrarProvincia
const borrarProvincia = async (req, res = response) => {
    const _id = req.params.id;
    try {
        //Obtener la Provincia
        const provinciaDB = await Provincia.findById(_id);
        if(!provinciaDB){
            return res.status(404).json({
                ok: false,
                msg: 'Esta Provincia con ese id no existe'
            });
        }

        //Borrar la Provincia
        await Provincia.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: 'Provincia Eliminada'
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
    getProvincia,
    getProvinciaId,
    getProvinciasPorPais,
    crearProvincia,
    actualizarProvincia,
    borrarProvincia
}

