
const express = require('express');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/UserModel');
const { generateJWT } = require('../helpers/generateJWt');
// const {validationResult} = require('express-validator'); //obtiene los resultados de las validaciones implementadas en las rutas
// res= express.response es para que salgan las ayudas de autocompletado de codigo
const createUser = async (req, res = express.response) => { 

    const {email, password} = req.body;
    
    try {
        let user = await UserModel.findOne({email: email});
        if (user){
            return res.status(400).json({
                ok: false,
                msg: 'usuario existe con ese correo'
            })
        }
        user = new UserModel(req.body);

        //ENCRIPTAR CONTRASEÑA
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);


        await user.save();
        //GENERAR JWT
        const token = await generateJWT(user.id, user.name)

        console.log("Saved!")
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token: token,
            msg: 'register'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: `${error}`
        })
    }

}

const loginUser = async (req, res = express.response) => {

    const {email, password} = req.body;

    try {
        const user = await UserModel.findOne({email});
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario inexistente'
            })
        }
        //CONFIRMAR PASSWORDS
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword){
            return res.status.json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        //GENERAR JWT
        const token = await generateJWT(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token: token
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Ha ocurrido un error, por favor comuniquese con el admin'
        })
    }

    // res.json({
    //     ok: true,
    //     msg: 'login',
    //     email,
    //     password
    // })

}

const renewToken = async (req, res = express.response) => {

    const uid = req.uid;
    const name = req.name;
    //GENERATE JWT
    const token = await generateJWT(uid, name)
    res.json({
        ok: true,
        token
    })

}

module.exports = {
    createUser,
    loginUser,
    renewToken
}