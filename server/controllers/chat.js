import {Chat,ChatMessage} from "../models/index.js";


async function create(req,res){
    const {participante1_id,participante2_id} = req.body;//recibimos los dos ids de los participantes del chat
    console.log("Inicio",req.body);    
    const foundOne = await Chat.findOne({//Comprobamos si existen en la BD de esta manera
       participante1:participante1_id,
       participante2:participante2_id 
    });
console.log("foundOne",foundOne);
    const foundTwo = await Chat.findOne({//Comprobamos si existen en la BD o de esta otra
        participante1:participante2_id,
        participante2:participante1_id 
     });
     console.log("foundTwo",foundTwo);     
//Si estan le devolvemos un mensaje y nos salimos
     if(foundOne || foundTwo){
        res.status(200).send({msg:"Ya tienes un chat con este usuario"});
        return;
     }
 //Si no tiene chat creado, creamos una nueva instancia    
     const chat = new Chat({
        participante1:participante1_id,
        participante2:participante2_id
     });

     //y guardamos chat
     chat.save((error,chatStorage)=>{
        if(error){
           res.status(400).send({msg:"Error al crear chat"})     
        }else{
            res.status(201).send(chatStorage);
        }

     });
}

//Esta función me devolverá los chat mios no los de otra persona
async function getAll(req,res){
    console.log("HA ENTRADO EN getAll");
    const {user_id} = req.user;//Sacamos todos los chats que estan relacionados con user_id 
    console.log("UserID ",user_id);
    Chat.find({
        //$or esto es un condicional de moongose
        $or:[{participante1: user_id},{participante2:user_id}],//con esto me devuelve todos los chat del user_id
    })
    .populate("participante1")//con esto sacamos los datos del participante1 y 2
    .populate("participante2")
    .exec(async(error,chats)=>{
        if(error){
            return res.status(400).send({msg:"Error al obtener los chats"});
        }
        const arrayChats = [];
        console.log("getAll",chats);
        for await (const chat of chats){
            const response = await ChatMessage.findOne({chat:chat._id}).sort({
                createdAt:-1,
            });
            arrayChats.push({
                ...chat._doc,
                last_message_date: response?.createdAt || null,
            });//para saber el ultimo sms
        }
        console.log("SALE DE getAll",arrayChats);
        res.status(200).send(arrayChats);
    });
    
}
async function deleteChat(req,res){
    const chat_id = req.params.id;
    
    Chat.findByIdAndDelete(chat_id,(error)=>{
        if(error){
            res.status(400).send({msg:"Error al eliminar el chat"});
        }else{
            res.status(200).send({msg:"Chat eliminado"}); 
        }
    });
}

async function getChat(req,res){

    const chat_id = req.params.id;
    
    Chat.findById(chat_id,(error,chatStorage)=>{
        if(error){
            res.status(400).send({msg:"Error al obtener el chat"});
        }else{
            res.status(200).send(chatStorage); 
        }
    })
    .populate("participante1")
    .populate("participante2");  

}


export const ChatController = {
    create,
    getAll,
    deleteChat,
    getChat
}