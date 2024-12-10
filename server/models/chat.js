import mongoose from "mongoose";

const ChatSchema = mongoose.Schema({
    //estos van a ser las personas que hablan. Siempre van a ser dos
    participante1:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    },
    participante2:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    },
});

export const Chat = mongoose.model("Chat", ChatSchema);