//TODO ESTO ES PARA LOGIN 
import {User} from "../models/index.js";
import bscrypt from "bcryptjs";//encryptado de contraseñas
import {jwt} from "../utils/index.js"; //token

function register(req,res){
    
    const {email, password} = req.body;
    const user = new User({
        email:email.toLowerCase(),
        
    });

    const salt = bscrypt.genSaltSync(10);
    const hashPassword = bscrypt.hashSync(password, salt);
    user.password = hashPassword;

    //res.status(201).send({msg:"Todo OK"})
    user.save((error,userStorage)=>{
        if(error){
            res.status(400).send({msg: "Error al registrar el usuario"});
        }else {
            res.status(201).send(userStorage);
        }
    });

}

function login(req,res){
    //res.status(200).send("OK");
    console.log('LOGINNNNN');
    const {email,password} = req.body;
    
    
    const emailLowerCase = email.toLowerCase();
    User.findOne({email:emailLowerCase},(error,userStorage)=>{
        if(error){
            res.status(500).send({msg:"Error del servidor"});
        }else {
            bscrypt.compare(password,userStorage.password,(bcrypError,check)=>{
                if(bcrypError){
                    res.status(500).send({msg: "Error del servidor"});
                }else if(!check){
                    console.log('No check')
                    res.status(400).send({msg: "Contraseña incorrecta"});
                }else{
                    console.log('XXXentra else login');
                    //res.status(200).send(userStorage);
                    res.status(200).send({
                        access:jwt.createAccessToken(userStorage),
                        refresh:jwt.createRefreshToken(userStorage),
                    });
                }
            });
        }
    });
    
}
//
function refreshAccessToken(req,res){
    const {refreshtoken} = req.body;
    console.log('refreshtoken',refreshtoken);
   if(!refreshtoken)res.status(400).send({msg:"Token requerido"});
    
   const hasExpired = jwt.hasExpiredToken(refreshtoken);
   console.log('XXXXXX');
   if(hasExpired)res.status(400).send({msg:"Token expirado"});

   const {user_id} = jwt.decoded(refreshtoken);
   User.findById(user_id,(error,userStorage)=>{
    if(error){
        res.status(500).send({msg:"Error del servidor"});
    }else{
        res.status(200).send({
            accessToken:jwt.createAccessToken(userStorage),
        });
    }

   });

    
}
export const AuthController = {
    register,
    login,
    refreshAccessToken,
};