const { response } = require('express');

const CatOcupacional = require('../models/catocupacional');

const getCatOcupacional = async (req, res)=>{

    const desde = Number(req.query.desde) || 0; //para recoger donde comienza la paginacion

    const [ catocupacional, total ] = await Promise.all([
        CatOcupacional
            .find()
            .skip( desde )
            .limit( 5 ),

            CatOcupacional.countDocuments()
    ]);

    res.json({
        ok:true,
        catocupacional
    });
}

//devolver CatOcupacional
const getCatOcupacionalId = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el usuario
        const catOcupacionalDB = await CatOcupacional.findById(_id);
        
        if(!catOcupacionalDB){
            return res.status(404).json({
                ok: false,
                msg: 'Esta Categoria Ocupacional con ese id no existe'
            });
        }
        res.json({
            ok: true,
            catOcupacionalDB
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }

}

//Crear CatOcupacional
const crearCatOcupacional = async (req, res = response) => {
    //hacer el destructurin para obtener los daos que vienen del body
    const { catocupacional } = req.body;

    try {
        //validar si la TipoEmpleado existe
        const existeNombre = await CatOcupacional.findOne({catocupacional});
        if(existeNombre){
            return res.status(400).json({
                ok: false,
                msg: 'Esta Categoria Ocupacional ya existe'
            });
        }

        const catOcupacional = CatOcupacional(req.body);

        await catOcupacional.save();

        res.json({
            ok: true,
            catOcupacional
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Actualizar CatOcupacional
const actualizarCatOcupacional = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el CatOcupacional
        const catOcupacionalDB = await CatOcupacional.findById(_id);
        if(!catOcupacionalDB){
            return res.status(404).json({
                ok: false,
                msg: 'Esta Categoria Ocupacional con ese id no existe'
            });
        }

        const campos = req.body;

        
        //Actualizo la Servicio
        const catOcupacionalActualizado = await CatOcupacional.findByIdAndUpdate(_id, campos, {new:true});

        res.json({
            ok: true,
            catOcupacional: catOcupacionalActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Borrar CatOcupacional
const borrarCatOcupacional = async (req, res = response) => {
    const _id = req.params.id;
    try {
        //Obtener la CatOcupacional
        const catOcupacionalDB = await CatOcupacional.findById(_id);
        if(!catOcupacionalDB){
            return res.status(404).json({
                ok: false,
                msg: 'Esta Categoria Ocupacional con ese id no existe'
            });
        }

        //Borrar la CatOcupacional
        await CatOcupacional.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: 'Categoria Ocupacional Eliminada'
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
    getCatOcupacional,
    getCatOcupacionalId,
    crearCatOcupacional,
    actualizarCatOcupacional,
    borrarCatOcupacional
}

