const mongoose = require('mongoose');


const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("DB ONLINE!");
    } catch (error) {
        console.log(error)
        throw new Error('Error inicializando la db');
    }
}


module.exports = {
    dbConnection
}