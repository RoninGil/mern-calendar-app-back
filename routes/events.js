const express = require('express');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const router = express.Router();
const { check } = require('express-validator'); //check es un middleware que valida un campo en particular
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isDate } = require('../helpers/isDate');

router.use(validateJWT); // sirve para que todas las peticiones tengan el middleware, sin necesidad de mandarlo una por una
//obtener eventos
router.get('/', getEventos);

//crear eventos
router.post('/:id',
[
    check('title', 'Titulo obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio obligatoria').custom( isDate ),
    check('end', 'Fecha de fin obligatoria').custom( isDate ),
    validateFields
],
crearEvento);

//actualizar eventos
router.put('/:id',
[
    check('title', 'Titulo obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio obligatoria').custom( isDate ),
    check('end', 'Fecha de fin obligatoria').custom( isDate ),
    validateFields
],
actualizarEvento);

//borrar eventos
router.delete('/:id', eliminarEvento);
module.exports = router;