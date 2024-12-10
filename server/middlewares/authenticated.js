//aki va a comprobar si el usuario esta autenticado o no
//aki es donde va a dejar o no el pase a la app
import {jwt} from "..//utils/index.js"//nos traemos las funciones de jwt

function asureAuth(req,res,next){
    console.log("authenticated.asureAuth()");
    console.log("middleware ejecutado");
    console.log(req.headers);
    if(!req.headers.authorization){
       return res.status(403).send({msg:"La petición no tiene la cabecera de autenticación"}); 
    }

    //IMPORTANTE:Usamos la palabra Bearer para autenticarnos lo podemos ver 
//en imsomnia get test, en headers usamos Bearer
    console.log("replace" ,req.headers.authorization);
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log(token);
    //comprobamos token
    try{
        console.log("comprobamos token");
        const hasExpired = jwt.hasExpiredToken(token);
        if(hasExpired){
            return res.status(400).send({msg:"El token ha expirado"});
        }
        //obtenemos los datos de usuario
        const payload = jwt.decoded(token);//obtenemos token
        req.user = payload;
        next();
    }catch(error){
        return res.status(400).send({msg:"Token invalido"});
    }
}


export const mdAuth = {
    asureAuth,
}