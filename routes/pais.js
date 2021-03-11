/* Ruta para /api/pais */


const { Router } = require('express');
const { check } = require('express-validator');

const { getPais, getPaisId, crearPais, actualizarPais, borrarPais } = require('../controllers/pais');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT,getPais);

router.get('/:id', validarJWT,getPaisId);

router.post('/', validarJWT,
    [
        check('pais', 'Este Campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearPais
);

router.put('/:id', validarJWT,
    [
        check('pais', 'Este Campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarPais
 );

 router.delete('/:id', validarJWT, borrarPais);


module.exports = router;