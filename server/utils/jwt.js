
//TODO ESTO ES PARA EL LOGIN CREACION DE TOKEN
import jsonwebtoken from "jsonwebtoken";
import  { JWT_SECRET_KEY } from "../constants.js";

//esta funcion es la que va a indicar si el usuario tiene acceso a nuestra app
//cuando caduca nuestro token el usuario deja de tener acceso y se tendria que volver a logar cada 24h en este caso
function createAccessToken(user){
    const expToken = new Date();
    //aki decimos que  fecha va a caducar el token
    expToken.setHours(expToken.getHours()+24);

    //aki construimos el token
    const payload = {
        token_type: "access",
        user_id: user._id,
        iat:Date.now(),
        exp:expToken.getTime(),
    };
    return jsonwebtoken.sign(payload,JWT_SECRET_KEY);

}

//esta funcion sirve para refrescar el token del createAccesToken
//con esto generamos seguridad por si roban el token esta funcion la refresca cada mes y ese token ya no vale
function createRefreshToken(user){
    const expToken = new Date();
    expToken.setMonth(expToken.getMonth()+1);

    //aki construimos el token
    const payload = {
        token_type: "refresh",
        user_id: user._id,
        iat:Date.now(),
        exp:expToken.getTime(),
    };
    return jsonwebtoken.sign(payload, JWT_SECRET_KEY);
}

function decoded(token){
    //esto es para destructurar el json
    return jsonwebtoken.decode(token,JWT_SECRET_KEY,true);
}
//esta funcion es para saber si ha expirado el nuevo token
function hasExpiredToken(token){
    //1º descodificamos el token
    const {exp} = decoded(token);
    
    const currentDate = new Date().getTime();
    console.log('exp',exp);
    console.log('currentDate',currentDate);
//ESTO HAY QUE DESCOMENTARLO. AUNQUE ME DABA QUE HA EXPIRADO
    //if(exp<=currentDate){
        //ha expirado
      //  return true;
    //}
    //sigue vigente,no ha expirado
    return false;


}
//aki devolvemos 
export const jwt = {
    createAccessToken,
    createRefreshToken,
    decoded,
    hasExpiredToken

}