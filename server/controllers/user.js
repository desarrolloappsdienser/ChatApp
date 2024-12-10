import {User,Group} from "../models/index.js";
import { getFilePath } from "../utils/image.js";

//Funciones del contolador

async function getMe(req,res){
    console.log("Ha entrado en getMe")
    const {user_id} = req.user;
    
try {

    const response = await User.findById(user_id).select(["-password"]);//User.findById Esto es Moongose // Con esto "-password" quitamos la pasword
    if(!response){
        res.status(400).send({msg:"No se ha encontrado usuario"});
    }else{
        res.status(200).send(response);
    }

} catch (error) {
    res.status(500).send({msg:"Error del servidor"});
}
    
    

}
async function getUsers(req,res){
    try {
        const {user_id} = req.user;
        const users = await User.find({_id:{$ne:user_id}}).select("-password");//con esto _id:{$ne:user_id me devuelve todos los usuarios menos con el que estoy registrado(register)
        if(!users){
            res.status(400).send({msg:"No se han encontrado usuarios"}); 
        }else{
            
            res.status(200).send(users);
        }
        
    } catch (error) {
        res.status(500).send({msg:"Error del servidor"});  
    }
    
}
async function getUser(req,res){
    
    const {id} = req.params;
    try {
       const response = await User.findById(id).select(["-password"]); 
       if(!response){
        res.status(400).send({msg:"No se ha encontrado el usuario"});
       }else{
        res.status(200).send(response);
       }
    } catch (error) {
        res.status(500).send({msg:"Error del servidor"});  
    }

}
async function updateUser(req,res){
    console.log('updateUser',req);
    const {user_id} = req.user;
    const userData = req.body;
    //console.log('DD',getFilePath(req.files.avatar));
    if(req.files.avatar){//esto es xk el usuario que modificar el avatar
        const imagePath = getFilePath(req.files.avatar);
        userData.avatar = imagePath;
    }
        /*console.log('antes if');
        if(req.body.uri){//esto es xk el usuario que modificar el avatar
            console.log('entra if');
            const imagePath = getFilePath(req.body.uri);
            userData.avatar = imagePath;
        }*/
    
         User.findByIdAndUpdate({_id:user_id},userData,(error)=>{
            if(error){
                res.status(400).send({msg:"Error al actualizar el usuario"});
            }else{
                res.status(200).send(userData);  
            }
        });
 
}

async function getUserNoParticipaEnGrupo(req,res){
    const {group_id} = req.params;
   
    const group = await Group.findById(group_id);
    console.log("XXX",group);
    const participantsStrings = group.participants.toString();
    const participants = participantsStrings.split(",");
    const response = await User.find({_id:{$nin:participants}}).select(["-password",]);//devuelve todo menos psswrd

    if(!response){
        res.status(400).send({msg:"No se ha encontrado ningun usuario"});
    }else{
        res.status(200).send(response);  
    }

}

export const UserController = {
    getMe,
    getUsers,
    getUser,
    updateUser,
    getUserNoParticipaEnGrupo,
};