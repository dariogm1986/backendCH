const { response } = require('express');

const TipoEmpleado = require('../models/tipoempleado');

const getTipoEmpleado = async (req, res)=>{

    const desde = Number(req.query.desde) || 0; //para recoger donde comienza la paginacion

    const [ tipoempleado, total ] = await Promise.all([
        TipoEmpleado
            .find()
            .skip( desde )
            .limit( 5 ),

            TipoEmpleado.countDocuments()
    ]);

    res.json({
        ok:true,
        tipoempleado
    });
}

//devolver TipoEmpleado
const getTipoEmpleadoId = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el usuario
        const tipoEmpleadoDB = await TipoEmpleado.findById(_id);
        
        if(!tipoEmpleadoDB){
            return res.status(404).json({
                ok: false,
                msg: 'Esta TipoEmpleado con ese id no existe'
            });
        }
        res.json({
            ok: true,
            tipoEmpleadoDB
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }

}

//Crear TipoEmpleado
const crearTipoEmpleado = async (req, res = response) => {
    //hacer el destructurin para obtener los daos que vienen del body
    const { tipoempleado } = req.body;

    try {
        //validar si la TipoEmpleado existe
        const existeNombre = await TipoEmpleado.findOne({tipoempleado});
        if(existeNombre){
            return res.status(400).json({
                ok: false,
                msg: 'Este TipoEmpleado con ese Nombre ya existe'
            });
        }

        const tipoEmpleado = TipoEmpleado(req.body);

        await tipoEmpleado.save();

        res.json({
            ok: true,
            tipoEmpleado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Actualizar TipoEmpleado
const actualizarTipoEmpleado = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el TipoEmpleado
        const tipoEmpleadoDB = await TipoEmpleado.findById(_id);
        if(!tipoEmpleadoDB){
            return res.status(404).json({
                ok: false,
                msg: 'Este TipoEmpleado con ese id no existe'
            });
        }

        const campos = req.body;

        /*const { reup, ...campos } = req.body;
        if(ServicioDB.reup !== reup){
            //validar si la Servicio existe
            const existeReup = await Servicio.findOne({reup});
            if(existeReup){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una Servicio con ese Codigo Reup'
                });
            }
        }

        campos.reup = reup;*/
        //Actualizo la Servicio
        const tipoEmpleadoActualizado = await TipoEmpleado.findByIdAndUpdate(_id, campos, {new:true});

        res.json({
            ok: true,
            tipoEmpleado: tipoEmpleadoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Borrar TipoEmpleado
const borrarTipoEmpleado = async (req, res = response) => {
    const _id = req.params.id;
    try {
        //Obtener la TipoEmpleado
        const tipoEmpleadoDB = await TipoEmpleado.findById(_id);
        if(!tipoEmpleadoDB){
            return res.status(404).json({
                ok: false,
                msg: 'Este TipoEmpleado con ese id no existe'
            });
        }

        //Borrar la TipoEmpleado
        await TipoEmpleado.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: 'TipoEmpleado Eliminada'
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
    getTipoEmpleado,
    getTipoEmpleadoId,
    crearTipoEmpleado,
    actualizarTipoEmpleado,
    borrarTipoEmpleado
}

