const { response } = require('express');
const bcrypt = require('bcryptjs');

const Cargo = require('../models/cargo');
const { generarJWT } = require('../helpers/jwt');

const getCargo = async (req, res)=>{

    const desde = Number(req.query.desde) || 0; //para recoger donde comienza la paginacion

    const [ cargo, total ] = await Promise.all([
        Cargo
            .find()
            .populate('catocupacional', 'catocupacional')
            .populate('grupoescala', 'grupoescala'),

        Cargo.countDocuments()
    ]);

    res.json({
        ok:true,
        cargo
    });
}

//devolver Cargo
const getCargoId = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el usuario
        const cargoDB = await Promise.all([
            Cargo
                .findById(_id)
                .populate('catocupacional', 'catocupacional')
                .populate('grupoescala', 'grupoescala')
        ]);
        if(!cargoDB){
            return res.status(404).json({
                ok: false,
                msg: 'Esta Cargo con ese id no existe'
            });
        }
        res.json({
            ok: true,
            cargoDB
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }

}

//Crear Cargo
const crearCargo = async (req, res = response) => {
    //hacer el destructurin para obtener los daos que vienen del body
    const { cargo } = req.body;

    try {
        //validar si la Cargo existe
        const existeCargo = await Cargo.findOne({cargo});
        if(existeCargo){
            return res.status(400).json({
                ok: false,
                msg: 'Esta Cargo ya existe'
            });
        }

        const cargoInsert = Cargo(req.body);

        await cargoInsert.save();

        res.json({
            ok: true,
            cargoInsert
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Actualizar Cargo
const actualizarCargo = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener la empresa
        const cargoDB = await Cargo.findById(_id);
        if(!cargoDB){
            return res.status(404).json({
                ok: false,
                msg: 'Esta Cargo con ese id no existe'
            });
        }

        const { cargo, ...campos } = req.body;
        if(cargoDB.cargo !== cargo){
            //validar si la Cargo existe
            const existeCargo = await Cargo.findOne({Cargo});
            if(existeCargo){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe esta Cargo'
                });
            }
        }

        campos.cargo = cargo;
        //Actualizo la Cargo
        const cargoActualizada = await Cargo.findByIdAndUpdate(_id, campos, {new:true});

        res.json({
            ok: true,
            cargo: cargoActualizada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//BorrarCargo
const borrarCargo = async (req, res = response) => {
    const _id = req.params.id;
    try {
        //Obtener la Cargo
        const cargoDB = await Cargo.findById(_id);
        if(!cargoDB){
            return res.status(404).json({
                ok: false,
                msg: 'Esta Cargo con ese id no existe'
            });
        }

        //Borrar la Cargo
        await Cargo.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: 'Cargo Eliminado'
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
    getCargo,
    getCargoId,
    crearCargo,
    actualizarCargo,
    borrarCargo
}

