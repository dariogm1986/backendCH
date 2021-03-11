const { JsonWebTokenError } = require("jsonwebtoken");

const jwt = require('jsonwebtoken');


const validarJWT = (req, res, next)=>{

    //leer el token de los headers
    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la peticion'
        });
    }

    //verificar el jwt
    try {

        const {_id, nombre} = jwt.verify(token, process.env.JWT_SECRET); 
        //const payload = jwt.verify(token, process.env.JWT_SECRET); 
        req._id = _id;
        req.nombre = nombre;
        //console.log(nombre);
        
        next();

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'token no valido'
        });
    }

}

module.exports = {
    validarJWT,
}