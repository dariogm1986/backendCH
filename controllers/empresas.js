const { response } = require('express');
const bcrypt = require('bcryptjs');

const Empresa = require('../models/empresa');
const { generarJWT } = require('../helpers/jwt');

const getEmpresa = async (req, res)=>{
    const empresa = await Empresa.find();
    res.json({
        ok:true,
        empresa
    });
}

//devolver Empresa
const getEmpresaId = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el usuario
        const empresaDB = await Empresa.findById(_id);
        
        if(!empresaDB){
            return res.status(404).json({
                ok: false,
                msg: 'Esta Empresa con ese id no existe'
            });
        }
        res.json({
            ok: true,
            empresaDB
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }

}

//Crear Empresa
const crearEmpresa = async (req, res = response) => {
    //hacer el destructurin para obtener los daos que vienen del body
    const { nombre, reup } = req.body;

    try {
        //validar si la empresa existe
        const existeReup = await Empresa.findOne({reup});
        if(existeReup){
            return res.status(400).json({
                ok: false,
                msg: 'Esta Empresa con este Codigo Reup ya existe'
            });
        }

        const empresa = Empresa(req.body);

        await empresa.save();

        res.json({
            ok: true,
            empresa
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Actualizar Empresa
const actualizarEmpresa = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener la empresa
        const empresaDB = await Empresa.findById(_id);
        if(!empresaDB){
            return res.status(404).json({
                ok: false,
                msg: 'Este empresa con ese id no existe'
            });
        }

        const { reup, ...campos } = req.body;
        if(empresaDB.reup !== reup){
            //validar si la empresa existe
            const existeReup = await Empresa.findOne({reup});
            if(existeReup){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una Empresa con ese Codigo Reup'
                });
            }
        }

        campos.reup = reup;
        //Actualizo el usuario
        const empresaActualizada = await Empresa.findByIdAndUpdate(_id, campos, {new:true});

        res.json({
            ok: true,
            empresa: empresaActualizada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//BorrarEmpresa
const borrarEmpresa = async (req, res = response) => {
    const _id = req.params.id;
    try {
        //Obtener la empresa
        const empresaDB = await Empresa.findById(_id);
        if(!empresaDB){
            return res.status(404).json({
                ok: false,
                msg: 'Este empresa con ese id no existe'
            });
        }

        //Borrar la Empresa
        await Empresa.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: 'Empresa Eliminada'
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
    getEmpresa,
    getEmpresaId,
    crearEmpresa,
    actualizarEmpresa,
    borrarEmpresa
}