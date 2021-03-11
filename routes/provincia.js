/* Ruta para /api/provincia */


const { Router } = require('express');
const { check } = require('express-validator');

const { getProvincia, getProvinciaId, getProvinciasPorPais, crearProvincia, actualizarProvincia, borrarProvincia } = require('../controllers/provincia');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT,getProvincia);

router.get('/:id', validarJWT,getProvinciaId);

router.post('/pais', validarJWT,
    [
        check('pais', 'El campo debe ser valido').isMongoId(),
        validarCampos,
    ],
    getProvinciasPorPais
);

router.post('/', validarJWT,
    [
        check('provincia', 'El campo es obligatorio').not().isEmpty(),
        check('pais', 'El campo debe ser valido').isMongoId(),
        validarCampos,
    ],
    crearProvincia
);

router.put('/:id', validarJWT,
    [
        check('provincia', 'El campo es obligatorio').not().isEmpty(),
        check('pais', 'El campo debe ser valido').isMongoId(),
        validarCampos,
    ],
    actualizarProvincia
 );

 router.delete('/:id', validarJWT, borrarProvincia);


module.exports = router;