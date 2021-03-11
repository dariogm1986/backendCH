/* Ruta para /api/cargo */


const { Router } = require('express');
const { check } = require('express-validator');

const { getCargo, getCargoId, crearCargo, actualizarCargo, borrarCargo } = require('../controllers/cargo');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT,getCargo);

router.get('/:id', validarJWT,getCargoId);

router.post('/', validarJWT,
    [
        check('cargo', 'El campo es obligatorio').not().isEmpty(),
        check('catocupacional', 'El campo debe ser valido').isMongoId(),
        check('grupoescala', 'El campo debe ser valido').isMongoId(),
        validarCampos,
    ],
    crearCargo
);

router.put('/:id', validarJWT,
    [
        check('cargo', 'El campo es obligatorio').not().isEmpty(),
        check('catocupacional', 'El campo debe ser valido').isMongoId(),
        check('grupoescala', 'El campo debe ser valido').isMongoId(),
        validarCampos,
    ],
    actualizarCargo
 );

 router.delete('/:id', validarJWT, borrarCargo);


module.exports = router;