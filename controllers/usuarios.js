const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
//const { delete } = require('../routes/usuarios');

const getUsuarios = async (req, res)=>{
    
    const usuarios = await Usuario.find({}, 'nombre email role');
    res.json({
        ok: true,
        usuarios
    });
}

const getUsuario = async (req, res)=>{
    
    const _id = req.params.id;

    try {
        //Obtener el usuario
        const usuarioDB = await Usuario.findById(_id);
        
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Este usuario con ese id no existe'
            });
        }

        //console.log(_id);
        //const { email, password, ...campos} = req.body;
        // if(usuarioDB.email !== email){
            
        //     const existeEmail = await Usuario.findOne( { email } );
        //     if(existeEmail){
        //         return res.status(400).json({
        //             ok:false,
        //             msg:'Ya existe un usuario con ese email'
        //         });
        //     }
        // }
        // campos.email = email;
        //actualizar usuario
        //const usuarioActualizado = await Usuario.findByIdAndUpdate( _id, campos, { new:true });

        res.json({
            ok: true,
            usuarioDB
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }
    //const usuarios = await Usuario.find({}, 'nombre email role');
    
}

const crearUsuarios = async (req, res = response)=>{
    
    const { email, password, nombre } = req.body;

    try {
        //validar si el correo existe para no volver a insertarlo
        const existeEmail = await Usuario.findOne({email});
        
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'Este correo ya existe'
            });
        }

        const usuario = new Usuario(req.body);

        //encriptar contrasenya
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //Generar un TOKEN - JWT
        //const token = await generarJWT(usuario._id);  

        res.json({
            ok: true,
            usuario,
            //token
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }

}

//actualizar usuario
const actualizarUsuarios = async (req, res = response)=>{
    
    const _id = req.params.id;

    try {
        //Obtener el usuario
        const usuarioDB = await Usuario.findById(_id);
        
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Este usuario con ese id no existe'
            });
        }

        
        const { email, password, ...campos} = req.body;
        if(usuarioDB.email !== email){
            
            const existeEmail = await Usuario.findOne( { email } );
            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg:'Ya existe un usuario con ese email'
                });
            }
        }
        campos.email = email;
        //actualizar usuario
        const usuarioActualizado = await Usuario.findByIdAndUpdate( _id, campos, { new:true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... ver logs'
        });
    }

}

//borrar usuario
const borrarUsuarios = async (req, res = response)=>{

    const _id = req.params.id;

    try {

        //Obtener el usuario
        const usuarioDB = await Usuario.findById(_id);
        
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Este usuario con ese id no existe'
            });
        }

        await Usuario.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: 'Usuario Eliminado'
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
    getUsuarios,
    getUsuario,
    crearUsuarios,
    actualizarUsuarios,
    borrarUsuarios
}