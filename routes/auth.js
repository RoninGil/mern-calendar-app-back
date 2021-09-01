const express = require('express');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const router = express.Router();
const { check } = require('express-validator'); //check es un middleware que valida un campo en particular
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');



/*
    USER ROUTES:
    host + /api/auth
*/

router.post('/new',
    [
        check('name', 'Nombre obligatorio').not().isEmpty(), // arg1: nombre del campo, arg2: mensaje de error
        check('email', 'Email es obligatorio').isEmail(),
        check('password', 'Password invalido. Se requieren 6 caracteres').isLength({min: 6}),
        validateFields
    ],
    createUser 
);

router.post('/',
    [
        check('email', 'Email es obligatorio').isEmail(),
        check('password', 'Password invalido. Se requieren 6 caracteres').isLength({min: 6}),
        validateFields
    ] ,
    loginUser
);

router.get('/renew',validateJWT, renewToken)

module.exports = router;