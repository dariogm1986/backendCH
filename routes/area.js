/* Ruta para /api/area */


const { Router } = require('express');
const { check } = require('express-validator');

const { getArea, getAreaId, crearArea, actualizarArea, borrarArea } = require('../controllers/area');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT,getArea);

router.get('/:id', validarJWT,getAreaId);

router.post('/', validarJWT,
    [
        check('area', 'El campo es obligatorio').not().isEmpty(),
        check('tipoarea', 'El campo debe ser valido').isMongoId(),
        check('unidad', 'El campo debe ser valido').isMongoId(),
        validarCampos,
    ],
    crearArea
);

router.put('/:id', validarJWT,
    [
        check('area', 'El campo es obligatorio').not().isEmpty(),
        check('tipoarea', 'El campo debe ser valido').isMongoId(),
        check('unidad', 'El campo debe ser valido').isMongoId(),
        validarCampos,
    ],
    actualizarArea
 );

 router.delete('/:id', validarJWT, borrarArea);


module.exports = router;