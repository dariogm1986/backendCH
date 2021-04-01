const { response } = require('express');
const bcrypt = require('bcryptjs');

const Empleado = require('../models/empleado');
const { generarJWT } = require('../helpers/jwt');

const getEmpleado = async (req, res)=>{

    const desde = Number(req.query.desde) || 0; //para recoger donde comienza la paginacion

    const [ empleado, total ] = await Promise.all([
        Empleado
            .find()
            .populate('cargo', 'cargo'),

        Empleado.countDocuments()
    ]);

    res.json({
        ok:true,
        empleado
    });
}

//devolver Empleado
const getEmpleadoId = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el usuario
        const empleadoDB = await Promise.all([
            Empleado
                .findById(_id)
                .populate('cargo', 'cargo')
        ]);
        if(!empleadoDB){
            return res.status(404).json({
                ok: false,
                msg: 'Este Empleado con ese id no existe'
            });
        }
        res.json({
            ok: true,
            empleadoDB
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }

}

//Devolver Empleado por Unidad
const getEmpleadoPorArea = async (req, res = response)=>{

    const { area } = req.body;

    if(area){
        const [empleado] = await Promise.all([
            Empleado.find({area: {_id: area}}),
            Empleado.countDocuments()
        ]);
    
        res.json({
            ok:true,
            empleado
        });
    }
}

//Crear Empleado
const crearEmpleado = async (req, res = response) => {
    //hacer el destructurin para obtener los daos que vienen del body
    const { carne } = req.body;

    try {
        //validar si la Empleado existe
        const existeEmpleado = await Empleado.findOne({carne});
        if(existeEmpleado){
            return res.status(400).json({
                ok: false,
                msg: 'Esta Empleado ya existe'
            });
        }

        const empleadoInsert = Empleado(req.body);

        await empleadoInsert.save();

        res.json({
            ok: true,
            empleadoInsert
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Actualizar Empleado
const actualizarEmpleado = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener la empresa
        const empleadoDB = await Empleado.findById(_id);
        if(!empleadoDB){
            return res.status(404).json({
                ok: false,
                msg: 'Esta Empleado con ese id no existe'
            });
        }

        const { carne, ...campos } = req.body;
        if(empleadoDB.carne !== carne){
            //validar si la Empleado existe
            const existeEmpleado = await Empleado.findOne({carne});
            if(existeEmpleado){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe esta Empleado'
                });
            }
        }

        campos.carne = carne;
        //Actualizo la Empleado
        const empleadoActualizada = await Empleado.findByIdAndUpdate(_id, campos, {new:true});

        res.json({
            ok: true,
            empleado: empleadoActualizada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//BorrarEmpleado
const borrarEmpleado = async (req, res = response) => {
    const _id = req.params.id;
    try {
        //Obtener la Area
        const empleadoDB = await Empleado.findById(_id);
        if(!empleadoDB){
            return res.status(404).json({
                ok: false,
                msg: 'Esta Empleado con ese id no existe'
            });
        }

        //Borrar la Empleado
        await Empleado.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: 'Empleado Eliminado'
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
    getEmpleado,
    getEmpleadoId,
    getEmpleadoPorArea,
    crearEmpleado,
    actualizarEmpleado,
    borrarEmpleado
}

