/* Ruta para /api/empresa */


const { Router } = require('express');
const { check } = require('express-validator');

const { getEmpresa, getEmpresaId, crearEmpresa, actualizarEmpresa, borrarEmpresa } = require('../controllers/empresas');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT,getEmpresa);

router.get('/:id', validarJWT,getEmpresaId);

router.post('/', validarJWT,
    [
        check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
        check('reup', 'El codigo Reup es obligatorio').not().isEmpty(),
        check('director', 'El Director es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearEmpresa
);

router.put('/:id', validarJWT,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('reup', 'El codigo Reup es obligatorio').not().isEmpty(),
        check('director', 'El Director es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarEmpresa
 );

 router.delete('/:id', validarJWT, borrarEmpresa);


module.exports = router;