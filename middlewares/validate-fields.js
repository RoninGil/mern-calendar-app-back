const {response} = require('express');
const {validationResult} = require('express-validator'); //obtiene los resultados de las validaciones implementadas en las rutas

const validateFields = (req, res = response, next) => {

    const errors = validationResult( req );
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors: errors.mapped()
        })
    }
    next();
}

module.exports = {
    validateFields
}