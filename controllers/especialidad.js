const { response } = require('express');

const Especialidad = require('../models/especialidad');

const getEspecialidad = async (req, res)=>{

    const desde = Number(req.query.desde) || 0; //para recoger donde comienza la paginacion

    const [ especialidad, total ] = await Promise.all([
        Especialidad
            .find()
            .skip( desde )
            .limit( 5 ),

            Especialidad.countDocuments()
    ]);

    res.json({
        ok:true,
        especialidad
    });
}

//devolver Especialidad
const getEspecialidadId = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el usuario
        const especialidadDB = await Especialidad.findById(_id);
        
        if(!especialidadDB){
            return res.status(404).json({
                ok: false,
                msg: 'La Especialidad con ese id no existe'
            });
        }
        res.json({
            ok: true,
            especialidadDB
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }

}

//Crear Especialidad
const crearEspecialidad = async (req, res = response) => {
    //hacer el destructurin para obtener los daos que vienen del body
    const { especialidad } = req.body;

    try {
        //validar si la TipoEmpleado existe
        const existeNombre = await Especialidad.findOne({especialidad});
        if(existeNombre){
            return res.status(400).json({
                ok: false,
                msg: 'La Especialidad ya existe'
            });
        }

        const especialidadInsert = Especialidad(req.body);

        await especialidadInsert.save();

        res.json({
            ok: true,
            especialidadInsert
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Actualizar Especialidad
const actualizarEspecialidad = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el Especialidad
        const especialidadDB = await Especialidad.findById(_id);
        if(!especialidadDB){
            return res.status(404).json({
                ok: false,
                msg: 'La Especialidad con ese id no existe'
            });
        }

        const campos = req.body;

        
        //Actualizo la Servicio
        const especialidadActualizado = await Especialidad.findByIdAndUpdate(_id, campos, {new:true});

        res.json({
            ok: true,
            especialidad: especialidadActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Borrar Especialidad
const borrarEspecialidad = async (req, res = response) => {
    const _id = req.params.id;
    try {
        //Obtener la Especialidad
        const especialidadDB = await Especialidad.findById(_id);
        if(!especialidadDB){
            return res.status(404).json({
                ok: false,
                msg: 'La Especialidad con ese id no existe'
            });
        }

        //Borrar la Especialidad
        await Especialidad.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: 'Especialidad Eliminado'
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
    getEspecialidad,
    getEspecialidadId,
    crearEspecialidad,
    actualizarEspecialidad,
    borrarEspecialidad
}

