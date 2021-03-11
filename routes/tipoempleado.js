/* Ruta para /api/tipoempleado */


const { Router } = require('express');
const { check } = require('express-validator');

const { getTipoEmpleado, getTipoEmpleadoId, crearTipoEmpleado, actualizarTipoEmpleado, borrarTipoEmpleado } = require('../controllers/TipoEmpleado');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT,getTipoEmpleado);

router.get('/:id', validarJWT,getTipoEmpleadoId);

router.post('/', validarJWT,
    [
        check('tipoempleado', 'El tipo de empleado es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearTipoEmpleado
);

router.put('/:id', validarJWT,
    [
        check('tipoempleado', 'El tipo de empleado es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarTipoEmpleado
 );

 router.delete('/:id', validarJWT, borrarTipoEmpleado);


module.exports = router;