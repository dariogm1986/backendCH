const { response } = require('express');

const Coeficiente = require('../models/coeficiente');

const getCoeficiente = async (req, res)=>{

    const desde = Number(req.query.desde) || 0; //para recoger donde comienza la paginacion

    const [ coeficiente, total ] = await Promise.all([
        Coeficiente
            .find()
            .skip( desde )
            .limit( 5 ),

            Coeficiente.countDocuments()
    ]);

    res.json({
        ok:true,
        coeficiente
    });
}

//devolver Coeficiente
const getCoeficienteId = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el usuario
        const coeficienteDB = await Coeficiente.findById(_id);
        
        if(!coeficienteDB){
            return res.status(404).json({
                ok: false,
                msg: 'El Coeficiente con ese id no existe'
            });
        }
        res.json({
            ok: true,
            coeficienteDB
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }

}

//Crear Coeficiente
const crearCoeficiente = async (req, res = response) => {
    //hacer el destructurin para obtener los daos que vienen del body
    const { coeficiente } = req.body;

    try {
        //validar si la TipoEmpleado existe
        const existeNombre = await Coeficiente.findOne({coeficiente});
        if(existeNombre){
            return res.status(400).json({
                ok: false,
                msg: 'El Coeficiente ya existe'
            });
        }

        const coeficienteInsert = Coeficiente(req.body);

        await coeficienteInsert.save();

        res.json({
            ok: true,
            coeficienteInsert
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Actualizar Coeficiente
const actualizarCoeficiente = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el Coeficiente
        const coeficienteDB = await Coeficiente.findById(_id);
        if(!coeficienteDB){
            return res.status(404).json({
                ok: false,
                msg: 'El Coeficiente con ese id no existe'
            });
        }

        const campos = req.body;

        
        //Actualizo la Servicio
        const coeficienteActualizado = await Coeficiente.findByIdAndUpdate(_id, campos, {new:true});

        res.json({
            ok: true,
            coeficiente: coeficienteActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Borrar Coeficiente
const borrarCoeficiente = async (req, res = response) => {
    const _id = req.params.id;
    try {
        //Obtener la Coeficiente
        const coeficienteDB = await Coeficiente.findById(_id);
        if(!coeficienteDB){
            return res.status(404).json({
                ok: false,
                msg: 'El Coeficiente con ese id no existe'
            });
        }

        //Borrar la Coeficiente
        await Coeficiente.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: 'Coeficiente Eliminado'
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
    getCoeficiente,
    getCoeficienteId,
    crearCoeficiente,
    actualizarCoeficiente,
    borrarCoeficiente
}

