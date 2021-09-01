const {Schema, model} = require('mongoose');

const EventoSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    }
});

EventoSchema.method('toJSON', function (){ //con esto cambiamos la muestra de _id a id
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;

})

module.exports = model('Evento', EventoSchema);