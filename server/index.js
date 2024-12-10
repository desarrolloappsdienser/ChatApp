import{server} from "./app.js";
import { IP_SERVER,PORT,DB_USER,DB_PASSWORD,DB_HOST } from "./constants.js";
import {io} from "./utils/index.js";
import mongoose from "mongoose";

//const mongoDBUrl = 'mongodb+srv://'+DB_USER+':'+DB_PASSWORD+'@'+DB_HOST+'/';
const mongoDBUrl = 'mongodb+srv://admin:admin@chatapp.tpz3ybz.mongodb.net/';
mongoose.connect(mongoDBUrl,(error)=>{
    if(error)throw error;

    //con esto, levantamos nuestro servidor
    server.listen(PORT,() =>{
        console.log("#########################");
        console.log("######### API REST ######");
        console.log("#########################");
        console.log('http://localhost:3977/api');

        //con esto creamos una lista de gente conectada
       
        io.sockets.on("connection",(socket)=>{
            
            console.log("NUEVO USUARIO CONECTADO"); 
            
            //aki saca a la gente conectada
            socket.on("disconnect", () =>{
                console.log("USUARIO DESCONECTADO"); 
            });

            //aki metemos a alguin en la lista del chat
            socket.on("subscribe", (room) =>{
                socket.join(room);
            });

            //aki sacamos del chat(la lista)
            socket.on("unsubscribe", (room) =>{
                socket.leave(room);
            });

    })
});
})

