/* Ruta para /api/empleado */


const { Router } = require('express');
const { check } = require('express-validator');

const { getEmpleado, getEmpleadoId, crearEmpleado, actualizarEmpleado, borrarEmpleado, getEmpleadoPorArea } = require('../controllers/empleado');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT,getEmpleado);

router.get('/:id', validarJWT,getEmpleadoId);

router.post('/area', validarJWT,
    [
        check('area', 'El campo debe ser valido').isMongoId(),
        validarCampos,
    ],
    getEmpleadoPorArea
);

router.post('/', validarJWT,
    [
        check('carne', 'El campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearEmpleado
);

router.put('/:id', validarJWT,
    [
        check('carne', 'El campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarEmpleado
 );

 router.delete('/:id', validarJWT, borrarEmpleado);


module.exports = router;