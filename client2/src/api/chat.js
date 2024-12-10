import { ENV } from "../Utils";

export class Chat{
    async create(token,participante1,participante2){
        console.log("P1",participante1);
        console.log("P2",participante2);
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT}`;
            const params = {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`,
                },
                body:JSON.stringify({
                    participante1_id:participante1,
                    participante2_id:participante2,
                }),
            };
            const response = await fetch(url, params);
            const result = await response.json();

            if(response.status !== 200 && response.status !==201){
                throw result;
            }
         return result;  
        } catch (error) {
            throw error;
        }
    }

    async getAll(token){
        try {
           
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT}`;
            const params = {
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            };
            const response = await fetch(url, params);
            const result = await response.json();
            if(response.status !== 200)throw error;

            return result;
        } catch (error) {
            throw error;
        }

    }
    async remove(token,chatId){
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT}/${chatId}`;
           
            const params = {
                method:"delete",
                headers:{
                    Authorization:`Bearer ${token}`,
                },

            };
            const response = await fetch(url,params);
            const result = await response.json();
            
            if(response.status !==200)throw result;

            return result;

        } catch (error) {
            throw error;
        }
    }
    async obtain(token,chatId){
        
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT}/${chatId}`;
            
            const params = {
                method: 'GET',
                headers:{
                   'Content-Type': 'application/json',
                    Authorization:`Bearer ${token}`,
                },
            };
            const response = await fetch(url,params);

            const contentType = response.headers.get("Content-Type");
            
            let result;
            if (contentType && contentType.includes("application/json")) {
                result = await response.json();
            } else {
                const textResult = await response.text(); // Obtén la respuesta en texto
                
                throw new Error("La respuesta no es JSON.");
            }


            //const result = await response.json();
            
            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;  
        }
    }
}