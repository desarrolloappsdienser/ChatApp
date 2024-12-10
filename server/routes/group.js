import express from "express";
import multiparty from "connect-multiparty";
import {GroupController} from "../controllers/index.js";
import {mdAuth} from "../middlewares/index.js";

const mdUpload = multiparty({uploadDir: "./uploads/group"});
const api = express.Router();


api.post("/group",[mdAuth.asureAuth,mdUpload],GroupController.create);
api.get("/group",[mdAuth.asureAuth],GroupController.getAll);
api.get("/group/:id",[mdAuth.asureAuth],GroupController.getGroup);

api.patch("/group/exit/:id",[mdAuth.asureAuth],GroupController.exitGroup);
api.patch("/group/add_participants/:id",[mdAuth.asureAuth],GroupController.addparticipants);
api.patch("/group/ban/",[mdAuth.asureAuth],GroupController.banearParticipant);
api.patch("/group/:id",[mdAuth.asureAuth,mdUpload],GroupController.updateGroup);//este lo bajamos para que el de arriba se pueda ejecutar.Importa la posicion en que se pone
//primero se tienen que poner la url fijas y después las variables

export const groupRoutes = api;