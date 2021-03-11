const { response } = require('express');

const GradoCientifico = require('../models/gradocientifico');

const getGradoCientifico = async (req, res)=>{

    const desde = Number(req.query.desde) || 0; //para recoger donde comienza la paginacion

    const [ gradocientifico, total ] = await Promise.all([
        GradoCientifico
            .find()
            .skip( desde )
            .limit( 5 ),

            GradoCientifico.countDocuments()
    ]);

    res.json({
        ok:true,
        gradocientifico
    });
}

//devolver GradoCientifico
const getGradoCientificoId = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el usuario
        const gradoCientificoDB = await GradoCientifico.findById(_id);
        
        if(!gradoCientificoDB){
            return res.status(404).json({
                ok: false,
                msg: 'El Grado Cientifico con ese id no existe'
            });
        }
        res.json({
            ok: true,
            gradoCientificoDB
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }

}

//Crear GradoCientifico
const crearGradoCientifico = async (req, res = response) => {
    //hacer el destructurin para obtener los daos que vienen del body
    const { gradocientifico } = req.body;

    try {
        //validar si la TipoEmpleado existe
        const existeNombre = await GradoCientifico.findOne({gradocientifico});
        if(existeNombre){
            return res.status(400).json({
                ok: false,
                msg: 'El Grado Cientifico ya existe'
            });
        }

        const gradoCientificoInsert = GradoCientifico(req.body);

        await gradoCientificoInsert.save();

        res.json({
            ok: true,
            gradoCientificoInsert
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Actualizar GradoCientifico
const actualizarGradoCientifico = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el GradoCientifico
        const gradoCientificoDB = await GradoCientifico.findById(_id);
        if(!gradoCientificoDB){
            return res.status(404).json({
                ok: false,
                msg: 'El Grado Cientifico con ese id no existe'
            });
        }

        const campos = req.body;

        
        //Actualizo la Servicio
        const gradoCientificoActualizado = await GradoCientifico.findByIdAndUpdate(_id, campos, {new:true});

        res.json({
            ok: true,
            gradoCientifico: gradoCientificoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Borrar GradoCientifico
const borrarGradoCientifico = async (req, res = response) => {
    const _id = req.params.id;
    try {
        //Obtener la GradoCientifico
        const gradoCientificoDB = await GradoCientifico.findById(_id);
        if(!gradoCientificoDB){
            return res.status(404).json({
                ok: false,
                msg: 'El Grado Cientifico con ese id no existe'
            });
        }

        //Borrar la GradoCientifico
        await GradoCientifico.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: 'Grado Cientifico Eliminado'
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
    getGradoCientifico,
    getGradoCientificoId,
    crearGradoCientifico,
    actualizarGradoCientifico,
    borrarGradoCientifico
}

