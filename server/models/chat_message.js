import mongoose from "mongoose";
//creamos el modelo del mensaje
const ChatMessageSchema = mongoose.Schema(
    {

        chat:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Chat",
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        message: String,
        type:{
            type:String,
            enum:["TEXT","IMAGE"],
        },
    },
    {
        timestamps: true,//esto es para que cree la fecha de actualización y la fecha del mensaje
    }
);

export const ChatMessage = mongoose.model("ChatMessage",ChatMessageSchema);