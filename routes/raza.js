/* Ruta para /api/raza */


const { Router } = require('express');
const { check } = require('express-validator');

const { getRaza, getRazaId, crearRaza, actualizarRaza, borrarRaza } = require('../controllers/Raza');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT,getRaza);

router.get('/:id', validarJWT,getRazaId);

router.post('/', validarJWT,
    [
        check('raza', 'Este Campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearRaza
);

router.put('/:id', validarJWT,
    [
        check('raza', 'Este Campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarRaza
 );

 router.delete('/:id', validarJWT, borrarRaza);


module.exports = router;