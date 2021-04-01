const { response } = require('express');
const bcrypt = require('bcryptjs');

const Unidad = require('../models/unidad');
const { generarJWT } = require('../helpers/jwt');

const getUnidad = async (req, res)=>{

    const desde = Number(req.query.desde) || 0; //para recoger donde comienza la paginacion

    const [ unidades, total ] = await Promise.all([
        Unidad
            .find()
            .populate('empresa', 'nombre'),

        Unidad.countDocuments()
    ]);

    res.json({
        ok:true,
        unidades
    });
}

//devolver Unidad
const getUnidadId = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el usuario
        const unidadDB = await Promise.all([
            Unidad
                .findById(_id)
                .populate('empresa', 'nombre')
        ]);
        if(!unidadDB){
            return res.status(404).json({
                ok: false,
                msg: 'Esta Unidad con ese id no existe'
            });
        }
        res.json({
            ok: true,
            unidadDB
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
const getUnidadesPorEmpresa = async (req, res = response)=>{

    const { empresa } = req.body;

    if(empresa){
        const [unidades] = await Promise.all([
            Unidad.find({empresa: {_id: empresa}}),
            Unidad.countDocuments()
        ]);
    
        res.json({
            ok:true,
            unidades
        });
    }
}

//Crear Unidad
const crearUnidad = async (req, res = response) => {
    //hacer el destructurin para obtener los daos que vienen del body
    const { nombre, reup } = req.body;

    try {
        //validar si la unidad existe
        const existeReup = await Unidad.findOne({reup});
        if(existeReup){
            return res.status(400).json({
                ok: false,
                msg: 'Esta Unidad con este Codigo Reup ya existe'
            });
        }

        const unidad = Unidad(req.body);

        await unidad.save();

        res.json({
            ok: true,
            unidad
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Actualizar Unidad
const actualizarUnidad = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener la empresa
        const unidadDB = await Unidad.findById(_id);
        if(!unidadDB){
            return res.status(404).json({
                ok: false,
                msg: 'Este unidad con ese id no existe'
            });
        }

        const { reup, ...campos } = req.body;
        if(unidadDB.reup !== reup){
            //validar si la unidad existe
            const existeReup = await Unidad.findOne({reup});
            if(existeReup){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una Unidad con ese Codigo Reup'
                });
            }
        }

        campos.reup = reup;
        //Actualizo la Unidad
        const unidadActualizada = await Unidad.findByIdAndUpdate(_id, campos, {new:true});

        res.json({
            ok: true,
            unidad: unidadActualizada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//BorrarUnidad
const borrarUnidad = async (req, res = response) => {
    const _id = req.params.id;
    try {
        //Obtener la unidad
        const unidadDB = await Unidad.findById(_id);
        if(!unidadDB){
            return res.status(404).json({
                ok: false,
                msg: 'Este unidad con ese id no existe'
            });
        }

        //Borrar la unidad
        await Unidad.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: 'Unidad Eliminada'
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
    getUnidad,
    getUnidadId,
    getUnidadesPorEmpresa,
    crearUnidad,
    actualizarUnidad,
    borrarUnidad
}

