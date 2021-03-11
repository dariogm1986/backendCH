const { response } = require('express');

const Pais = require('../models/pais');

const getPais = async (req, res)=>{

    const desde = Number(req.query.desde) || 0; //para recoger donde comienza la paginacion

    const [ pais, total ] = await Promise.all([
        Pais
            .find()
            .skip( desde )
            .limit( 5 ),

            Pais.countDocuments()
    ]);

    res.json({
        ok:true,
        pais
    });
}

//devolver Pais
const getPaisId = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el usuario
        const paisDB = await Pais.findById(_id);
        
        if(!paisDB){
            return res.status(404).json({
                ok: false,
                msg: 'El Pais con ese id no existe'
            });
        }
        res.json({
            ok: true,
            paisDB
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }

}

//Crear Pais
const crearPais = async (req, res = response) => {
    //hacer el destructurin para obtener los daos que vienen del body
    const { pais } = req.body;

    try {
        //validar si la TipoEmpleado existe
        const existeNombre = await Pais.findOne({pais});
        if(existeNombre){
            return res.status(400).json({
                ok: false,
                msg: 'El Pais ya existe'
            });
        }

        const paisInsert = Pais(req.body);

        await paisInsert.save();

        res.json({
            ok: true,
            paisInsert
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Actualizar Pais
const actualizarPais = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el Pais
        const paisDB = await Pais.findById(_id);
        if(!paisDB){
            return res.status(404).json({
                ok: false,
                msg: 'El Pais con ese id no existe'
            });
        }

        const campos = req.body;

        
        //Actualizo la Servicio
        const paisActualizado = await Pais.findByIdAndUpdate(_id, campos, {new:true});

        res.json({
            ok: true,
            Pais: paisActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Borrar Pais
const borrarPais = async (req, res = response) => {
    const _id = req.params.id;
    try {
        //Obtener la Pais
        const paisDB = await Pais.findById(_id);
        if(!paisDB){
            return res.status(404).json({
                ok: false,
                msg: 'El Pais con ese id no existe'
            });
        }

        //Borrar la Pais
        await Pais.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: 'Pais Eliminado'
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
    getPais,
    getPaisId,
    crearPais,
    actualizarPais,
    borrarPais
}

