/* Ruta para /api/especialidad */


const { Router } = require('express');
const { check } = require('express-validator');

const { getEspecialidad, getEspecialidadId, crearEspecialidad, actualizarEspecialidad, borrarEspecialidad } = require('../controllers/especialidad');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT,getEspecialidad);

router.get('/:id', validarJWT,getEspecialidadId);

router.post('/', validarJWT,
    [
        check('especialidad', 'Este Campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearEspecialidad
);

router.put('/:id', validarJWT,
    [
        check('especialidad', 'Este Campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarEspecialidad
 );

 router.delete('/:id', validarJWT, borrarEspecialidad);


module.exports = router;