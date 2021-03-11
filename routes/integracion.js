/* Ruta para /api/integracion */


const { Router } = require('express');
const { check } = require('express-validator');

const { getIntegracion, getIntegracionId, crearIntegracion, actualizarIntegracion, borrarIntegracion } = require('../controllers/Integracion');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT,getIntegracion);

router.get('/:id', validarJWT,getIntegracionId);

router.post('/', validarJWT,
    [
        check('integracion', 'Este Campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearIntegracion
);

router.put('/:id', validarJWT,
    [
        check('integracion', 'Este Campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarIntegracion
 );

 router.delete('/:id', validarJWT, borrarIntegracion);


module.exports = router;