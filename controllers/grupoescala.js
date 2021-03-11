const { response } = require('express');

const GrupoEscala = require('../models/grupoescala');

const getGrupoEscala = async (req, res)=>{

    const desde = Number(req.query.desde) || 0; //para recoger donde comienza la paginacion

    const [ grupoescala, total ] = await Promise.all([
        GrupoEscala
            .find()
            .skip( desde )
            .limit( 5 ),

            GrupoEscala.countDocuments()
    ]);

    res.json({
        ok:true,
        grupoescala
    });
}

//devolver GrupoEscala
const getGrupoEscalaId = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el usuario
        const grupoEscalaDB = await GrupoEscala.findById(_id);
        
        if(!grupoEscalaDB){
            return res.status(404).json({
                ok: false,
                msg: 'El Grupo Escala con ese id no existe'
            });
        }
        res.json({
            ok: true,
            grupoEscalaDB
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }

}

//Crear GrupoEscala
const crearGrupoEscala = async (req, res = response) => {
    //hacer el destructurin para obtener los daos que vienen del body
    const { grupoescala } = req.body;

    try {
        //validar si la TipoEmpleado existe
        const existeNombre = await GrupoEscala.findOne({grupoescala});
        if(existeNombre){
            return res.status(400).json({
                ok: false,
                msg: 'El Grupo Escala ya existe'
            });
        }

        const grupoEscalaInsert = GrupoEscala(req.body);

        await grupoEscalaInsert.save();

        res.json({
            ok: true,
            grupoEscalaInsert
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Actualizar GrupoEscala
const actualizarGrupoEscala = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el GrupoEscala
        const grupoEscalaDB = await GrupoEscala.findById(_id);
        if(!grupoEscalaDB){
            return res.status(404).json({
                ok: false,
                msg: 'El Grupo Escala con ese id no existe'
            });
        }

        const campos = req.body;

        
        //Actualizo la Servicio
        const grupoEscalaActualizado = await GrupoEscala.findByIdAndUpdate(_id, campos, {new:true});

        res.json({
            ok: true,
            grupoEscala: grupoEscalaActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Borrar GrupoEscala
const borrarGrupoEscala = async (req, res = response) => {
    const _id = req.params.id;
    try {
        //Obtener la GrupoEscala
        const grupoEscalaDB = await GrupoEscala.findById(_id);
        if(!grupoEscalaDB){
            return res.status(404).json({
                ok: false,
                msg: 'El Grupo Escala con ese id no existe'
            });
        }

        //Borrar la GrupoEscala
        await GrupoEscala.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: 'Grupo Escala Eliminado'
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
    getGrupoEscala,
    getGrupoEscalaId,
    crearGrupoEscala,
    actualizarGrupoEscala,
    borrarGrupoEscala
}

