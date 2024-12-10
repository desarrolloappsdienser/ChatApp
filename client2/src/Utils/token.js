import {jwtDecode} from "jwt-decode";


//para comprobar si el token ha caducado o no
export function hasExpiredToken(token){
    
    try {
        const {exp} = jwtDecode(token);
        const currentDate = new Date().getDate();
       if(exp<=currentDate){
            console.log("#####hasExpiredToken  exp<=currentDate");
            return true;
        }
        
    } catch (error) {
        console.error('Error decoding JWT:', error);
    }
    
    return false;
}