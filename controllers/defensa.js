const { response } = require('express');

const Defensa = require('../models/defensa');

const getDefensa = async (req, res)=>{

    const desde = Number(req.query.desde) || 0; //para recoger donde comienza la paginacion

    const [ defensa, total ] = await Promise.all([
        Defensa
            .find()
            .skip( desde )
            .limit( 5 ),

            Defensa.countDocuments()
    ]);

    res.json({
        ok:true,
        defensa
    });
}

//devolver Defensa
const getDefensaId = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el usuario
        const defensaDB = await Defensa.findById(_id);
        
        if(!defensaDB){
            return res.status(404).json({
                ok: false,
                msg: 'La Situacion de la defensa con ese id no existe'
            });
        }
        res.json({
            ok: true,
            defensaDB
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }

}

//Crear Defensa
const crearDefensa = async (req, res = response) => {
    //hacer el destructurin para obtener los daos que vienen del body
    const { defensa } = req.body;

    try {
        //validar si la TipoEmpleado existe
        const existeNombre = await Defensa.findOne({defensa});
        if(existeNombre){
            return res.status(400).json({
                ok: false,
                msg: 'Esta situacion de la defensa ya existe'
            });
        }

        const defensaInsert = Defensa(req.body);

        await defensaInsert.save();

        res.json({
            ok: true,
            defensaInsert
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Actualizar Defensa
const actualizarDefensa = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el Defensa
        const defensaDB = await Defensa.findById(_id);
        if(!defensaDB){
            return res.status(404).json({
                ok: false,
                msg: 'La situcion de la defensa con ese id no existe'
            });
        }

        const campos = req.body;

        
        //Actualizo la Servicio
        const defensaActualizado = await Defensa.findByIdAndUpdate(_id, campos, {new:true});

        res.json({
            ok: true,
            defensa: defensaActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Borrar Defensa
const borrarDefensa = async (req, res = response) => {
    const _id = req.params.id;
    try {
        //Obtener la Defensa
        const defensaDB = await Defensa.findById(_id);
        if(!defensaDB){
            return res.status(404).json({
                ok: false,
                msg: 'La situacion de la defensa con ese id no existe'
            });
        }

        //Borrar la Defensa
        await Defensa.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: 'Situacion de la defensa Eliminado'
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
    getDefensa,
    getDefensaId,
    crearDefensa,
    actualizarDefensa,
    borrarDefensa
}

