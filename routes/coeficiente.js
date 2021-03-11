/* Ruta para /api/coeficiente */


const { Router } = require('express');
const { check } = require('express-validator');

const { getCoeficiente, getCoeficienteId, crearCoeficiente, actualizarCoeficiente, borrarCoeficiente } = require('../controllers/coeficiente');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT,getCoeficiente);

router.get('/:id', validarJWT,getCoeficienteId);

router.post('/', validarJWT,
    [
        check('coeficiente', 'Este Campo es obligatorio').not().isEmpty(),
        check('valor', 'Este Campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearCoeficiente
);

router.put('/:id', validarJWT,
    [
        check('coeficiente', 'Este Campo es obligatorio').not().isEmpty(),
        check('valor', 'Este Campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarCoeficiente
 );

 router.delete('/:id', validarJWT, borrarCoeficiente);


module.exports = router;