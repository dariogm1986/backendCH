/* Ruta para /api/niveleducacional */


const { Router } = require('express');
const { check } = require('express-validator');

const { getNivelEducacional, getNivelEducacionalId, crearNivelEducacional, actualizarNivelEducacional, borrarNivelEducacional } = require('../controllers/niveleducacional');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT,getNivelEducacional);

router.get('/:id', validarJWT,getNivelEducacionalId);

router.post('/', validarJWT,
    [
        check('niveleducacional', 'Este Campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearNivelEducacional
);

router.put('/:id', validarJWT,
    [
        check('niveleducacional', 'Este Campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarNivelEducacional
 );

 router.delete('/:id', validarJWT, borrarNivelEducacional);


module.exports = router;