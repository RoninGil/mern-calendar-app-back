const express = require('express');
const Evento = require('../models/Evento');

const getEventos = (req, res) => {

    

    res.status(200).json({
        ok: true,
        msg: 'getEventos'
    })
}

const crearEvento = async(req, res) => {


    const eventoDB = new Evento(req.body);
    try {
        eventoDB.user = req.uid;
        const eventoGuardado = await eventoDB.save()
        res.json({
            ok: true,
            evento: eventoGuardado
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador. ERROR'
        })
    }
}

const actualizarEvento = (req, res) => {

    res.status(200).json({
        ok: true,
        msg: 'actualizarEvento'
    })
}

const eliminarEvento = (req, res) => {

    res.status(200).json({
        ok: true,
        msg: 'eliminarEvento'
    })
}
module.exports={
    getEventos, 
    crearEvento, 
    actualizarEvento, 
    eliminarEvento
}