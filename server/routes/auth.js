import express from "express";
import { AuthController } from "../controllers/index.js";
import {mdAuth} from "../middlewares/index.js";



const api = express.Router();
//estas rutas se incluyen automaticamente en app.js
//son los endPoint

api.post("/auth/register",AuthController.register);
api.post("/auth/login", AuthController.login);
api.post("/auth/refresh_access_token", AuthController.refreshAccessToken);//AuthController.refreshAccessToken esta la funcion acoplada
//api.post("/auth/refresh_access_token",[], AuthController.refreshAccessToken); ejemplo de donde iria el missleware

//(req,res)=> la funcion esta desacoplada. [] aki es donde van los middleware siempre es le va hacer si ejecuta el callback o no (req,res)=>
//ESTO ES PARA VER QUE FUNCIONA EL MIDDLEWARE ES UN TEST
/*api.get("/auth/test_md",[mdAuth.asureAuth], (req,res)=>{
    res.status(200).send({msg:"Todo OK"});
    console.log(req.user);
});*/

export const authRoutes = api;