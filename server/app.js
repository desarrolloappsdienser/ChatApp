import  express  from "express";
import { initSocketServer } from "./utils/index.js";
import http from "http";
import bodyParser from "body-parser";//bajada de yarn.com
import cors from "cors";//bajada de yarn.com
import morgan from "morgan";//bajada de yarn.com
import {authRoutes, userRoutes,chatRoutes,ChatMessageRoutes,groupRoutes,groupMessageRoutes} from "./routes/index.js";


//ejecutamos express
const app = express();
//creamos un servidor
const server = http.createServer(app);
initSocketServer(server);//inicializamos con un socketserver


//Esto sirve para poder mandar contenido en el body de las peticiones HTTP

// configure bodyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//es para guardar ficheros y luego desde el cliente se puedan consultar
//configurar carpeta estatica 
app.use(express.static("uploads"));

//Configure Header HTTP- CORS

app.use(cors());

//Configure routings
//todas las rutas configuradas en auth.js routes se van a incluir aki automaticamente
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",chatRoutes);
app.use("/api",ChatMessageRoutes);
app.use("/api",groupRoutes);
app.use("/api",groupMessageRoutes);


//Configure logger HTTP logger
app.use(morgan("dev"));









export {server};//lo exportamos