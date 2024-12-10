import express from "express";
import multipart from "connect-multiparty";
import{GroupMessageController} from "../controllers/index.js";
import {mdAuth} from "../middlewares/index.js";

const mdUpload = multipart({uploadDir:"./uploads/images"});
const api = express.Router();


api.post("/group/message",[mdAuth.asureAuth],GroupMessageController.sendtext);
api.post("/group/message/image",[mdAuth.asureAuth,mdUpload],GroupMessageController.sendImage);
api.get("/group/message/:group_id",[mdAuth.asureAuth],GroupMessageController.getAll);
api.get("/group/message/total/:group_id",[mdAuth.asureAuth],GroupMessageController.getTotalMessages);
api.get("/group/message/last/:group_id",[mdAuth.asureAuth],GroupMessageController.getLastMessages);


export const groupMessageRoutes = api;