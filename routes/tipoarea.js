/* Ruta para /api/tipoarea */


const { Router } = require('express');
const { check } = require('express-validator');

const { getTipoArea, getTipoAreaId, crearTipoArea, actualizarTipoArea, borrarTipoArea } = require('../controllers/TipoArea');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT,getTipoArea);

router.get('/:id', validarJWT,getTipoAreaId);

router.post('/', validarJWT,
    [
        check('tipoarea', 'El Nombre es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearTipoArea
);

router.put('/:id', validarJWT,
    [
        check('tipoarea', 'El Nombre es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarTipoArea
 );

 router.delete('/:id', validarJWT, borrarTipoArea);


module.exports = router;