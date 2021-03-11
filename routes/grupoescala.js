/* Ruta para /api/grupoescala */


const { Router } = require('express');
const { check } = require('express-validator');

const { getGrupoEscala, getGrupoEscalaId, crearGrupoEscala, actualizarGrupoEscala, borrarGrupoEscala } = require('../controllers/grupoescala');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT,getGrupoEscala);

router.get('/:id', validarJWT,getGrupoEscalaId);

router.post('/', validarJWT,
    [
        check('grupoescala', 'Este Campo es obligatorio').not().isEmpty(),
        check('salarioescala', 'Este Campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearGrupoEscala
);

router.put('/:id', validarJWT,
    [
        check('grupoescala', 'Este Campo es obligatorio').not().isEmpty(),
        check('salarioescala', 'Este Campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarGrupoEscala
 );

 router.delete('/:id', validarJWT, borrarGrupoEscala);


module.exports = router;