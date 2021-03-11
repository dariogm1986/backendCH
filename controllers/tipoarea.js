const { response } = require('express');

const TipoArea = require('../models/tipoarea');

const getTipoArea = async (req, res)=>{

    const desde = Number(req.query.desde) || 0; //para recoger donde comienza la paginacion

    const [ tipoArea, total ] = await Promise.all([
        TipoArea
            .find()
            .skip( desde )
            .limit( 5 ),

            TipoArea.countDocuments()
    ]);

    res.json({
        ok:true,
        tipoArea
    });
}

//devolver TipoArea
const getTipoAreaId = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el usuario
        const tipoAreaDB = await TipoArea.findById(_id);
        
        if(!tipoAreaDB){
            return res.status(404).json({
                ok: false,
                msg: 'Esta TipoArea con ese id no existe'
            });
        }
        res.json({
            ok: true,
            tipoAreaDB
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }

}

//Crear TipoArea
const crearTipoArea = async (req, res = response) => {
    //hacer el destructurin para obtener los daos que vienen del body
    const { tipoarea } = req.body;

    try {
        //validar si la TipoArea existe
        const existeNombre = await TipoArea.findOne({tipoarea});
        if(existeNombre){
            return res.status(400).json({
                ok: false,
                msg: 'Este TipoArea con ese Nombre ya existe'
            });
        }

        const tipoArea = TipoArea(req.body);

        await tipoArea.save();

        res.json({
            ok: true,
            tipoArea
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Actualizar TipoArea
const actualizarTipoArea = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el TipoArea
        const tipoAreaDB = await TipoArea.findById(_id);
        if(!tipoAreaDB){
            return res.status(404).json({
                ok: false,
                msg: 'Este TipoArea con ese id no existe'
            });
        }

        const campos = req.body;

        //Actualizo la Servicio
        const tipoAreaActualizado = await TipoArea.findByIdAndUpdate(_id, campos, {new:true});

        res.json({
            ok: true,
            tipoArea: tipoAreaActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Borrar TipoArea
const borrarTipoArea = async (req, res = response) => {
    const _id = req.params.id;
    try {
        //Obtener la TipoArea
        const tipoAreaDB = await TipoArea.findById(_id);
        if(!tipoAreaDB){
            return res.status(404).json({
                ok: false,
                msg: 'Este TipoArea con ese id no existe'
            });
        }

        //Borrar la TipoArea
        await TipoArea.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: 'TipoArea Eliminada'
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
    getTipoArea,
    getTipoAreaId,
    crearTipoArea,
    actualizarTipoArea,
    borrarTipoArea
}

