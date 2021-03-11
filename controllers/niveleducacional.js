const { response } = require('express');

const NivelEducacional = require('../models/niveleducacional');

const getNivelEducacional = async (req, res)=>{

    const desde = Number(req.query.desde) || 0; //para recoger donde comienza la paginacion

    const [ niveleducacional, total ] = await Promise.all([
        NivelEducacional
            .find()
            .skip( desde )
            .limit( 5 ),

            NivelEducacional.countDocuments()
    ]);

    res.json({
        ok:true,
        niveleducacional
    });
}

//devolver NivelEducacional
const getNivelEducacionalId = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el usuario
        const nivelEducacionalDB = await NivelEducacional.findById(_id);
        
        if(!nivelEducacionalDB){
            return res.status(404).json({
                ok: false,
                msg: 'El Nivel Educacional con ese id no existe'
            });
        }
        res.json({
            ok: true,
            nivelEducacionalDB
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }

}

//Crear NivelEducacional
const crearNivelEducacional = async (req, res = response) => {
    //hacer el destructurin para obtener los daos que vienen del body
    const { niveleducacional } = req.body;

    try {
        //validar si la TipoEmpleado existe
        const existeNombre = await NivelEducacional.findOne({niveleducacional});
        if(existeNombre){
            return res.status(400).json({
                ok: false,
                msg: 'El Nivel Educacional ya existe'
            });
        }

        const nivelEducacionalInsert = NivelEducacional(req.body);

        await nivelEducacionalInsert.save();

        res.json({
            ok: true,
            nivelEducacionalInsert
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Actualizar NivelEducacional
const actualizarNivelEducacional = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el NivelEducacional
        const nivelEducacionalDB = await NivelEducacional.findById(_id);
        if(!nivelEducacionalDB){
            return res.status(404).json({
                ok: false,
                msg: 'El Nivel Educacional con ese id no existe'
            });
        }

        const campos = req.body;

        
        //Actualizo la Servicio
        const nivelEducacionalActualizado = await NivelEducacional.findByIdAndUpdate(_id, campos, {new:true});

        res.json({
            ok: true,
            niveleducacional: nivelEducacionalActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Borrar NivelEducacional
const borrarNivelEducacional = async (req, res = response) => {
    const _id = req.params.id;
    try {
        //Obtener la NivelEducacional
        const nivelEducacionalDB = await NivelEducacional.findById(_id);
        if(!nivelEducacionalDB){
            return res.status(404).json({
                ok: false,
                msg: 'El Nivel Educacional con ese id no existe'
            });
        }

        //Borrar la NivelEducacional
        await NivelEducacional.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: 'Nivel Educacional Eliminado'
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
    getNivelEducacional,
    getNivelEducacionalId,
    crearNivelEducacional,
    actualizarNivelEducacional,
    borrarNivelEducacional
}

