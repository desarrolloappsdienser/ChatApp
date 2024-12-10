import express from "express";
import {ChatController} from "../controllers/index.js";
import {mdAuth} from "../middlewares/index.js";//para saberlos usuario que estan logados

const api = express.Router();

api.post("/chat",[mdAuth.asureAuth],ChatController.create);//[mdAuth.asureAuth] petición autenticada
api.get("/chat",[mdAuth.asureAuth],ChatController.getAll);
api.delete("/chat/:id",[mdAuth.asureAuth],ChatController.deleteChat);//borramos chat
api.get("/chat/:id",[mdAuth.asureAuth],ChatController.getChat);
export const chatRoutes = api;