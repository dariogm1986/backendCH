/* Ruta para /api/municipio */


const { Router } = require('express');
const { check } = require('express-validator');

const { getMunicipio, getMunicipioId, crearMunicipio, actualizarMunicipio, borrarMunicipio, getMunicipiosPorProvincia } = require('../controllers/municipio');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT,getMunicipio);

router.get('/:id', validarJWT,getMunicipioId);

router.post('/provincia', validarJWT,
    [
        check('provincia', 'El campo debe ser valido').isMongoId(),
        validarCampos,
    ],
    getMunicipiosPorProvincia
);

router.post('/', validarJWT,
    [
        check('municipio', 'El campo es obligatorio').not().isEmpty(),
        check('provincia', 'El campo debe ser valido').isMongoId(),
        validarCampos,
    ],
    crearMunicipio
);

router.put('/:id', validarJWT,
    [
        check('municipio', 'El campo es obligatorio').not().isEmpty(),
        check('provincia', 'El campo debe ser valido').isMongoId(),
        validarCampos,
    ],
    actualizarMunicipio
 );

 router.delete('/:id', validarJWT, borrarMunicipio);


module.exports = router;