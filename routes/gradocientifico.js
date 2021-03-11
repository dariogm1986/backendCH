/* Ruta para /api/gradocientifico */


const { Router } = require('express');
const { check } = require('express-validator');

const { getGradoCientifico, getGradoCientificoId, crearGradoCientifico, actualizarGradoCientifico, borrarGradoCientifico } = require('../controllers/gradocientifico');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT,getGradoCientifico);

router.get('/:id', validarJWT,getGradoCientificoId);

router.post('/', validarJWT,
    [
        check('gradocientifico', 'Este Campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearGradoCientifico
);

router.put('/:id', validarJWT,
    [
        check('gradocientifico', 'Este Campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarGradoCientifico
 );

 router.delete('/:id', validarJWT, borrarGradoCientifico);


module.exports = router;