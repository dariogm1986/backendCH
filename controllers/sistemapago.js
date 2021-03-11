const { response } = require('express');

const SistemaPago = require('../models/sistemapago');

const getSistemaPago = async (req, res)=>{

    const desde = Number(req.query.desde) || 0; //para recoger donde comienza la paginacion

    const [ sistemapago, total ] = await Promise.all([
        SistemaPago
            .find()
            .skip( desde )
            .limit( 5 ),

            SistemaPago.countDocuments()
    ]);

    res.json({
        ok:true,
        sistemapago
    });
}

//devolver SistemaPago
const getSistemaPagoId = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el usuario
        const sistemaPagoDB = await SistemaPago.findById(_id);
        
        if(!sistemaPagoDB){
            return res.status(404).json({
                ok: false,
                msg: 'El Sistema de Pago con ese id no existe'
            });
        }
        res.json({
            ok: true,
            sistemaPagoDB
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }

}

//Crear SistemaPago
const crearSistemaPago = async (req, res = response) => {
    //hacer el destructurin para obtener los daos que vienen del body
    const { sistemapago } = req.body;

    try {
        //validar si la TipoEmpleado existe
        const existeNombre = await SistemaPago.findOne({sistemapago});
        if(existeNombre){
            return res.status(400).json({
                ok: false,
                msg: 'El Sistema de Pago ya existe'
            });
        }

        const sistemaPagoInsert = SistemaPago(req.body);

        await sistemaPagoInsert.save();

        res.json({
            ok: true,
            sistemaPagoInsert
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Actualizar SistemaPago
const actualizarSistemaPago = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el SistemaPago
        const sistemaPagoDB = await SistemaPago.findById(_id);
        if(!sistemaPagoDB){
            return res.status(404).json({
                ok: false,
                msg: 'El Sistema de Pago con ese id no existe'
            });
        }

        const campos = req.body;

        
        //Actualizo la Servicio
        const sistemaPagoActualizado = await SistemaPago.findByIdAndUpdate(_id, campos, {new:true});

        res.json({
            ok: true,
            sistemapago: sistemaPagoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Borrar SistemaPago
const borrarSistemaPago = async (req, res = response) => {
    const _id = req.params.id;
    try {
        //Obtener la SistemaPago
        const sistemaPagoDB = await SistemaPago.findById(_id);
        if(!sistemaPagoDB){
            return res.status(404).json({
                ok: false,
                msg: 'El Sistema de Pago con ese id no existe'
            });
        }

        //Borrar la SistemaPago
        await SistemaPago.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: 'Sistema de Pago Eliminado'
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
    getSistemaPago,
    getSistemaPagoId,
    crearSistemaPago,
    actualizarSistemaPago,
    borrarSistemaPago
}

