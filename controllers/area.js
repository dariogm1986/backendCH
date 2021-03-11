const { response } = require('express');
const bcrypt = require('bcryptjs');

const Area = require('../models/area');
const { generarJWT } = require('../helpers/jwt');

const getArea = async (req, res)=>{

    const desde = Number(req.query.desde) || 0; //para recoger donde comienza la paginacion

    const [ area, total ] = await Promise.all([
        Area
            .find()
            .populate('tipoarea', 'tipoarea')
            .populate('sistemapago', 'sistemapago')
            .populate('nombre', 'unidad'),

        Area.countDocuments()
    ]);

    res.json({
        ok:true,
        area
    });
}

//devolver Area
const getAreaId = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el usuario
        const areaDB = await Promise.all([
            Area
                .findById(_id)
                .populate('tipoarea', 'tipoarea')
                .populate('sistemapago', 'sistemapago')
                .populate('nombre', 'unidad')
        ]);
        if(!areaDB){
            return res.status(404).json({
                ok: false,
                msg: 'Esta Area con ese id no existe'
            });
        }
        res.json({
            ok: true,
            areaDB
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }

}

//Crear Area
const crearArea = async (req, res = response) => {
    //hacer el destructurin para obtener los daos que vienen del body
    const { area } = req.body;

    try {
        //validar si la Area existe
        const existeArea = await Area.findOne({area});
        if(existeArea){
            return res.status(400).json({
                ok: false,
                msg: 'Esta Area ya existe'
            });
        }

        const areaInsert = Area(req.body);

        await areaInsert.save();

        res.json({
            ok: true,
            areaInsert
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Actualizar Area
const actualizarArea = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener la empresa
        const areaDB = await Area.findById(_id);
        if(!areaDB){
            return res.status(404).json({
                ok: false,
                msg: 'Esta Area con ese id no existe'
            });
        }

        const { area, ...campos } = req.body;
        if(areaDB.area !== area){
            //validar si la Area existe
            const existeArea = await Area.findOne({Area});
            if(existeArea){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe esta Area'
                });
            }
        }

        campos.area = area;
        //Actualizo la Area
        const areaActualizada = await Area.findByIdAndUpdate(_id, campos, {new:true});

        res.json({
            ok: true,
            area: areaActualizada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//BorrarArea
const borrarArea = async (req, res = response) => {
    const _id = req.params.id;
    try {
        //Obtener la Area
        const areaDB = await Area.findById(_id);
        if(!areaDB){
            return res.status(404).json({
                ok: false,
                msg: 'Esta Area con ese id no existe'
            });
        }

        //Borrar la Area
        await Area.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: 'Area Eliminado'
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
    getArea,
    getAreaId,
    crearArea,
    actualizarArea,
    borrarArea
}

