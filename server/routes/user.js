import express from "express";
import {UserController} from "../controllers/index.js";
import {mdAuth} from "../middlewares/index.js";
import multipart from "connect-multiparty";
const api = express.Router();
const mdUpload = multipart({uploadDir: "./uploads/avatar"});//definimos donde queremos que se dejen los ficheros subidos
//Add endpoints
api.get("/user/me",[mdAuth.asureAuth],UserController.getMe);
api.get("/user",[mdAuth.asureAuth],UserController.getUsers);
api.get("/user/:id",[mdAuth.asureAuth],UserController.getUser);
api.patch("/user/me",[mdAuth.asureAuth,mdUpload],UserController.updateUser);//modificar
api.get("/users_except_participants_group/:group_id",[mdAuth.asureAuth],UserController.getUserNoParticipaEnGrupo);
export const userRoutes = api;