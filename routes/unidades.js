/* Ruta para /api/unidades */


const { Router } = require('express');
const { check } = require('express-validator');

const { getUnidad, getUnidadId, crearUnidad, actualizarUnidad, borrarUnidad } = require('../controllers/unidades');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT,getUnidad);

router.get('/:id', validarJWT,getUnidadId);

router.post('/', validarJWT,
    [
        check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
        check('reup', 'El codigo Reup es obligatorio').not().isEmpty(),
        check('director', 'El Director es obligatorio').not().isEmpty(),
        check('empresa', 'La Empresa debe ser valida').isMongoId(),
        validarCampos,
    ],
    crearUnidad
);

router.put('/:id', validarJWT,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('reup', 'El codigo Reup es obligatorio').not().isEmpty(),
        check('director', 'El Director es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarUnidad
 );

 router.delete('/:id', validarJWT, borrarUnidad);


module.exports = router;