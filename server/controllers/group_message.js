import {GroupMessage} from "../models/index.js";
import {io,getFilePath} from "../utils/index.js";


function sendtext(req,res){
    
    const {group_id, message} = req.body;
    const {user_id} = req.user;

    const group_message = new GroupMessage({
        group:group_id,
        user:user_id,
        message,
        type:"TEXT",

    });

    group_message.save(async (error)=>{
        if(error){
            res.status(500).send({msg:"Error del servidor"});
        }else{
            const data = await group_message.populate("user");
            io.sockets.in(group_id).emit("message",data);//con esto emitimos el mensaje
            io.sockets.in(`${group_id}_notify`).emit("message_notify",data);
            res.status(201).send({});
        }
    });
}

function sendImage(req,res){
console.log("ENTRAXXX",req.body);
    const {group_id} = req.body;
    console.log("group_id",group_id);
    const {user_id} = req.user;

    const group_message = new GroupMessage({
        group:group_id,
        user:user_id,
        message:getFilePath(req.files.image),
        type:"IMAGE",

    });

    group_message.save(async (error)=>{
        if(error){
            res.status(500).send({msg:"Error del servidor"});
        }else{
            
            const data = await group_message.populate("user");
            
            io.sockets.in(group_id).emit("message",data);//con esto emitimos el mensaje
            io.sockets.in(`${group_id}_notify`).emit("message_notify",data);
            res.status(201).send({});
        }
    });

}

async function getAll(req,res){
    console.log("GROUP GETALL",req.params);
    const {group_id} = req.params;
    
    try {
      const messages = await GroupMessage.find({group:group_id})
      .sort({createdAt:1})
      .populate("user");
      
      const total = await GroupMessage.find({group:group_id}).count();
      res.status(200).send({messages,total});

    } catch (error) {
        console.log("ENTRA POR EL CATCH");
        res.status(500).send({msg:"Error del servidor"});
    }

}

async function getTotalMessages(req,res){
    console.log("getTotalMessages",req.params);
    const {group_id} = req.params;

    try {
        const total = await GroupMessage.find({group:group_id}).count();
        console.log("total",total);
        res.status(200).send(JSON.stringify(total));
  
      } catch (error) {
          res.status(500).send({msg:"Error del servidor"});
      }
}

async function getLastMessages(req,res){

    const {group_id} = req.params;

    try {
        const response = await GroupMessage.findOne({group:group_id})
        .sort({createdAt:-1})
        .populate("user");
               
        res.status(200).send(response || {});
  
      } catch (error) {
          res.status(500).send({msg:"Error del servidor"});
      }
}

export const GroupMessageController = {
    sendtext,
    sendImage,
    getAll,
    getTotalMessages,
    getLastMessages
}