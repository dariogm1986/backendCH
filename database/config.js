const mongoose = require('mongoose');

//mongoose.connect('url', opciones).then(()=>{}); Para conectar con la base de datos
const dbConnection = async()=>{

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }); 
        console.log("BD Online");
    } catch (error) {
        console.log(error);
        throw new Error("Error al conectarse");
    }   

} 

module.exports = {
    dbConnection
}