const { response } = require('express');

const Carrera = require('../models/carrera');

const getCarrera = async (req, res)=>{

    const desde = Number(req.query.desde) || 0; //para recoger donde comienza la paginacion

    const [ carrera, total ] = await Promise.all([
        Carrera
            .find()
            .skip( desde )
            .limit( 5 ),

            Carrera.countDocuments()
    ]);

    res.json({
        ok:true,
        carrera
    });
}

//devolver Carrera
const getCarreraId = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el usuario
        const carreraDB = await Carrera.findById(_id);
        
        if(!carreraDB){
            return res.status(404).json({
                ok: false,
                msg: 'La Carrera con ese id no existe'
            });
        }
        res.json({
            ok: true,
            carreraDB
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }

}

//Crear Carrera
const crearCarrera = async (req, res = response) => {
    //hacer el destructurin para obtener los daos que vienen del body
    const { carrera } = req.body;

    try {
        //validar si la TipoEmpleado existe
        const existeNombre = await Carrera.findOne({carrera});
        if(existeNombre){
            return res.status(400).json({
                ok: false,
                msg: 'La Carrera ya existe'
            });
        }

        const carreraInsert = Carrera(req.body);

        await carreraInsert.save();

        res.json({
            ok: true,
            carreraInsert
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Actualizar Carrera
const actualizarCarrera = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el Carrera
        const carreraDB = await Carrera.findById(_id);
        if(!carreraDB){
            return res.status(404).json({
                ok: false,
                msg: 'La Carrera con ese id no existe'
            });
        }

        const campos = req.body;

        
        //Actualizo la Servicio
        const carreraActualizado = await Carrera.findByIdAndUpdate(_id, campos, {new:true});

        res.json({
            ok: true,
            carrera: carreraActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Borrar Carrera
const borrarCarrera = async (req, res = response) => {
    const _id = req.params.id;
    try {
        //Obtener la Carrera
        const carreraDB = await Carrera.findById(_id);
        if(!carreraDB){
            return res.status(404).json({
                ok: false,
                msg: 'La Carrera con ese id no existe'
            });
        }

        //Borrar la Carrera
        await Carrera.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: 'Carrera Eliminado'
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
    getCarrera,
    getCarreraId,
    crearCarrera,
    actualizarCarrera,
    borrarCarrera
}

