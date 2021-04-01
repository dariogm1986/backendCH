const { response } = require('express');
const bcrypt = require('bcryptjs');

const Municipio = require('../models/municipio');
const { generarJWT } = require('../helpers/jwt');

const getMunicipio = async (req, res)=>{

    const desde = Number(req.query.desde) || 0; //para recoger donde comienza la paginacion

    const [ municipio, total ] = await Promise.all([
        Municipio
            .find()
            .populate('provincia', 'provincia'),

        Municipio.countDocuments()
    ]);

    res.json({
        ok:true,
        municipio
    });
}

//devolver Municipio
const getMunicipioId = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener el usuario
        const municipioDB = await Promise.all([
            Municipio
                .findById(_id)
                .populate('provincia', 'provincia')
        ]);
        if(!municipioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Este Municipio con ese id no existe'
            });
        }
        res.json({
            ok: true,
            municipioDB
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }

}

//Devolver Municipios por Provincias
const getMunicipiosPorProvincia = async (req, res = response)=>{

    const { provincia } = req.body;

    if(provincia){
        const [municipio] = await Promise.all([
            Municipio.find({provincia: {_id: provincia}}),
            Municipio.countDocuments()
        ]);
    
        res.json({
            ok:true,
            municipio
        });
    }
}

//Crear Municipio
const crearMunicipio = async (req, res = response) => {
    //hacer el destructurin para obtener los daos que vienen del body
    const { municipio, provincia } = req.body;

    try {
        //validar si la Municipio existe
        const existeMunicipio = await Municipio.findOne({municipio});
        if(existeMunicipio){
            return res.status(400).json({
                ok: false,
                msg: 'Este Municipio ya existe'
            });
        }

        const municipioInsert = Municipio(req.body);

        await municipioInsert.save();

        res.json({
            ok: true,
            municipioInsert
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//Actualizar Municipio
const actualizarMunicipio = async (req, res = response) =>{
    const _id = req.params.id;

    try {
        //Obtener la empresa
        const municipioDB = await Municipio.findById(_id);
        if(!municipioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Este Municipio con ese id no existe'
            });
        }

        const { municipio, ...campos } = req.body;
        if(municipioDB.municipio !== municipio){
            //validar si la Municipio existe
            const existeMunicipio = await Municipio.findOne({municipio});
            if(existeMunicipio){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe este Municipio'
                });
            }
        }

        campos.municipio = municipio;
        //Actualizo la Municipio
        const municipioActualizada = await Municipio.findByIdAndUpdate(_id, campos, {new:true});

        res.json({
            ok: true,
            municipio: municipioActualizada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
}

//BorrarMunicipio
const borrarMunicipio = async (req, res = response) => {
    const _id = req.params.id;
    try {
        //Obtener la Municipio
        const municipioDB = await Municipio.findById(_id);
        if(!municipioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Este Municipio con ese id no existe'
            });
        }

        //Borrar la Municipio
        await Municipio.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: 'Municipio Eliminado'
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
    getMunicipio,
    getMunicipioId,
    getMunicipiosPorProvincia,
    crearMunicipio,
    actualizarMunicipio,
    borrarMunicipio
}

