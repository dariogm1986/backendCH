/* Ruta para /api/sistemapago */


const { Router } = require('express');
const { check } = require('express-validator');

const { getSistemaPago, getSistemaPagoId, crearSistemaPago, actualizarSistemaPago, borrarSistemaPago } = require('../controllers/sistemapago');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT,getSistemaPago);

router.get('/:id', validarJWT,getSistemaPagoId);

router.post('/', validarJWT,
    [
        check('sistemapago', 'Este Campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearSistemaPago
);

router.put('/:id', validarJWT,
    [
        check('sistemapago', 'Este Campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarSistemaPago
 );

 router.delete('/:id', validarJWT, borrarSistemaPago);


module.exports = router;