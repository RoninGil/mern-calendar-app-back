const express = require('express');
const Evento = require('../models/Evento');

const getEventos = async(req, res) => {

    const eventos = await Evento.find()
                                .populate('user', 'name');

    res.status(200).json({
        ok: true,
        eventos
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

const actualizarEvento = async(req, res) => {

    const eventoID = req.params.id;
    const uid = req.uid;
    try {
        const evento = await Evento.findById(eventoID)
        if (!evento){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese ID'
            })
        }
        if (evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg: 'No tiene permisos para editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        // const eventoActualizado = await Evento.findByIdAndUpdate(eventoID, nuevoEvento); //asi retornas el evento SIN ACTUALIZAR
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoID, nuevoEvento, {new: true}); //asi se retorna el evento ACTUALIZADO

        res.json({
            ok:true,
            evento: eventoActualizado
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'ha ocurrido un error al actualizar'
        })
    }
}

const eliminarEvento = async(req, res) => {

    const eventoID = req.params.id;
    const uid = req.uid;

    try {
        
        const evento = await Evento.findById(eventoID);
        if(!evento){
            return res.status(404).json({
                ok:false,
                msg: 'Evento no encontrado, no se puede eliminar.'
            })
        }
        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg: 'No tiene permisos para borrar este evento.'
            })
        }

        const eventoEliminado = await Evento.findByIdAndDelete(eventoID);
        res.status(200).json({
            ok:true,
            eventoEliminado
        })

    } catch (error) {
        console.log(error);
        res.json({
            ok:false,
            msg: 'Error, contacte al administrador.'
        })
    }
}
module.exports={
    getEventos, 
    crearEvento, 
    actualizarEvento, 
    eliminarEvento
}