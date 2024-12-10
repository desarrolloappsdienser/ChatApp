import {useState, useEffect,createContext} from "react";
import {User,Auth} from "../api";
import {hasExpiredToken} from "../Utils";


const userController = new User();
const authController = new Auth();

export const AuthContext = createContext();

export function AuthProvider(props){
    const {children} = props;
    const [user,setUser] = useState(null);
    const [token,setToken] = useState(null);
    const [loading,setLoading] = useState(true);
    

    useEffect(()=>{
        //esta funcion se ejecuta cuando entramos en la app por 1ª vez
        //funcion anonima autoejecutable
        (async()=>{

            const accessToken = await authController.getAccessToken();
            const refreshToken = await authController.getRefreshToken();
            //comporbamos que existe el accesstoken y refreshtoken. Si existe, comprobamos en el token.js en metodo hasExpiredToken
            if(!accessToken && !refreshToken){
               
                logout();
                setLoading(false);
                return;
            }

            if(hasExpiredToken(accessToken)){
                
                //si entra por aki el token ha caducado
                if(hasExpiredToken(refreshToken)){
                    //si tanto accessToken como refreshToken han caducado. Cerramos sesion
                    logout();
                }else{
                    //si no ha caducado hacemos un relogin refrescando el accessToken
                    relogin(refreshToken);
                }
            }else{
                await login(accessToken);
            }

            setLoading(false);
        })();
    },[]);
    
    const relogin = async (refreshToken)=>{
        try {
            const {accessToken} = await authController.refreshAccessToken(
                refreshToken
            );
            await authController.setAccessToken(accessToken);
            await login(accessToken);//para iniciar sesion
        } catch (error) {
            console.error(error);
        }

    };
//Aki se va a generar el login de la app
    const login = async (accessToken)=>{
        try {
            
           
            setLoading(true);
            const response = await userController.getMe(accessToken);
            setUser(response);
            
            setToken(accessToken);
            setLoading(false);
        } catch (error) {
           console.log(error);
           setLoading(false); 
        }

    };

    const logout =  ()=>{
       setUser(null);
       setToken(null);
       authController.removeTokens();
    };

    const updateUser =  (key,value)=>{
        //esta funcion es para actualizar usuario
        setUser({
            ...user,
            [key]: value,
        });
    };
    const data = {
      //aki van los datos que vamos a acceder mediante hooks personalizados  
      accessToken:token,user,login,logout,updateUser,
    };

    if(loading) return null;

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}