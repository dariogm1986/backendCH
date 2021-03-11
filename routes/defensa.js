/* Ruta para /api/defensa */


const { Router } = require('express');
const { check } = require('express-validator');

const { getDefensa, getDefensaId, crearDefensa, actualizarDefensa, borrarDefensa } = require('../controllers/defensa');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT,getDefensa);

router.get('/:id', validarJWT,getDefensaId);

router.post('/', validarJWT,
    [
        check('defensa', 'Este Campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearDefensa
);

router.put('/:id', validarJWT,
    [
        check('defensa', 'Este Campo es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarDefensa
 );

 router.delete('/:id', validarJWT, borrarDefensa);


module.exports = router;