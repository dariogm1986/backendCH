/* Ruta para /api/usuarios */


const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, getUsuario, crearUsuarios, actualizarUsuarios, borrarUsuarios } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT,getUsuarios);

router.get('/:id', validarJWT,getUsuario);

router.post('/', validarJWT, 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    crearUsuarios
);

router.put('/:id', validarJWT,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarUsuarios
 );

 router.delete('/:id', validarJWT, borrarUsuarios);


module.exports = router;