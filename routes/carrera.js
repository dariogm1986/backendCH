/* Ruta para /api/carrera */


const { Router } = require('express');
const { check } = require('express-validator');

const { getCarrera, getCarreraId, crearCarrera, actualizarCarrera, borrarCarrera } = require('../controllers/carrera');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT,getCarrera);

router.get('/:id', validarJWT,getCarreraId);

router.post('/', validarJWT,
    [
        check('carrera', 'Este Campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearCarrera
);

router.put('/:id', validarJWT,
    [
        check('carrera', 'Este Campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarCarrera
 );

 router.delete('/:id', validarJWT, borrarCarrera);


module.exports = router;