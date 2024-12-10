import {ENV} from "../Utils";

export class User {
    async getMe(accessToken){
        try {
           const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ME}`; 
           const params = {
                headers:{
                    Authorization:`Bearer ${accessToken}`,
                },
           };
           
           const response = await fetch(url, params);
           const result = await response.json();

           if(response.status != 200) throw result;

           return result;

        } catch (error) {
            throw error;
        }
    }

    async updateUser(accessToken, userData){
        //este metodo caambio imagenes, el nombre y apellidos de ajustes
        try {
           
            const data = userData;
            const formData = new FormData();
            console.log('DATA',data);
            
          /* Object.keys(data).forEach((key)=>{
                
                formData.append(key, data[key]);
                console.log('XXX',key);
            });*/

            
            if(data.type!=null ){
                const a = data.type.replace('ì','i');
                formData.append("avatar", {
                    uri: data.uri,
                    type: a,//"image/png" ,
                    name: data.name,
                });
            }else{
                Object.keys(data).forEach((key)=>{
                
                    formData.append(key, data[key]);
                    console.log('XXX',key);
                });
            }
           
           
           
            
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ME}`;
            const params = {
                method: 'PATCH',
                body: formData,
                headers:{
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type':'multipart/form-data',
                },
                files: formData
                
               
            };
           
           // console.log(formData);
            const response = await fetch(url,params);
            const result = await response.json();
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }


            
            if(response.status !==200)throw result;
            return result;


        } catch (error) {
            throw error;
        }
    }
    async getAll(accessToken){
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USER}`;
            const params = {
                headers:{
                    Authorization:`Bearer ${accessToken}`,
                },
            };
            const response = await fetch(url,params);
            const result = await response.json();

            if(response.status !== 200)throw result;

            return result;

        } catch (error) {
            throw error;
        }
    } 

    async getUser(accessToken,userId){
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USER}/${userId}`;
            const params = {
                headers:{
                    Authorization:`Bearer ${accessToken}`,
                },
            };
            const response = await fetch(url,params);
            const result = await response.json();

            if(response.status !== 200)throw result;

            return result;

        } catch (error) {
            throw error;
        } 
    }
    async getUsersExeptParticipantsGroup(accessToken,groupId){
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USER_EXCEPT_PARTICIPANTS_GROUP}/${groupId}`;
            const params = {
                headers:{
                    Authorization: `Bearer ${accessToken}`,
                },
                
            };
            const response = await fetch(url,params);
            const result = await response.json();

            if(response.status !== 200)throw result;

            return result;
        } catch (error) {
            throw error;  
        }
    }

    
}