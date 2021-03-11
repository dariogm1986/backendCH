/* Ruta para /api/estadocivil */


const { Router } = require('express');
const { check } = require('express-validator');

const { getEstadoCivil, getEstadoCivilId, crearEstadoCivil, actualizarEstadoCivil, borrarEstadoCivil } = require('../controllers/estadocivil');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT,getEstadoCivil);

router.get('/:id', validarJWT,getEstadoCivilId);

router.post('/', validarJWT,
    [
        check('estadocivil', 'Este Campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearEstadoCivil
);

router.put('/:id', validarJWT,
    [
        check('estadocivil', 'Este Campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarEstadoCivil
 );

 router.delete('/:id', validarJWT, borrarEstadoCivil);


module.exports = router;