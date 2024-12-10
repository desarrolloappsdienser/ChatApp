import { ENV } from "../Utils";

export class GroupMessage {
    async getTotal(accessToken, groupid){
        try {
           const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GROUP_MESSAGE_TOTAL}/${groupid}`; 
           
           const params = {
            headers:{
                Authorization: `Bearer ${accessToken}`,
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

    async getLastMessage(accessToken, groupid){
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GROUP_MESSAGE_LAST}/${groupid}`;
            const params = {
                headers:{
                    Authorization: `Bearer ${accessToken}`,
                },
               };
               
            const response = await fetch(url,params); 
            const result = await response.json();  
               
            if(response.status !==200)throw result;
               
            return result;
        } catch (error) {
            
        }
    }

    async getAll(accessToken, groupid){
        try {
            console.log("GROUP GETALL",groupid);
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GROUP_MESSAGE}/${groupid}`; 
           
            const params = {
             headers:{
                 Authorization: `Bearer ${accessToken}`,
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

    async sendText(accessToken,groupid,message){
        try {
            

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GROUP_MESSAGE}`;
            const params = {
                method:"POST",
                headers:{
                    
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body:JSON.stringify({
                    group_id:groupid,
                    message,
                }), 
            }
            const response = await fetch(url, params);
            const result = await response.json();
            if(response.status !== 201)throw result;
            return true;
        } catch (error) {
            throw error;
        }

    }

    async sendImage(token,groupid,file){
        try {
            
            const formData = new FormData();
            formData.append("group_id",groupid);
            console.log("imagroupId",groupid);
            console.log("token",token);
            console.log("file",file);
            //formData.append("image",file);
            const a = file.type.replace('ì','i');
            console.log("image",a);
            formData.append("image", {
                uri: file.uri,
                type: a,//"image/png" ,
                name: file.name,
            });

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GROUP_MESSAGE_IMAGE}`;
            const params = {
                method:"POST",
                headers:{
                    'Content-Type':'multipart/form-data',
                    //"Content-Type":"application/json",
                    Authorization: `Bearer ${token}`,
                },
                body:formData,
            };
            
            const response = await fetch(url, params);
            console.log("response",response.status);
            const result = await response.json();
            if(response.status !== 201)throw result;
            return true;

        } catch (error) {
            throw error;
        }
    }
}