/* Ruta para /api/catocupacional */


const { Router } = require('express');
const { check } = require('express-validator');

const { getCatOcupacional, getCatOcupacionalId, crearCatOcupacional, actualizarCatOcupacional, borrarCatOcupacional } = require('../controllers/CatOcupacional');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT,getCatOcupacional);

router.get('/:id', validarJWT,getCatOcupacionalId);

router.post('/', validarJWT,
    [
        check('catocupacional', 'Este Campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearCatOcupacional
);

router.put('/:id', validarJWT,
    [
        check('catocupacional', 'Este Campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarCatOcupacional
 );

 router.delete('/:id', validarJWT, borrarCatOcupacional);


module.exports = router;