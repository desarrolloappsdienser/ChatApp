import { ENV } from "../Utils";

export class Group {
    async create(accessToken,creatorId, userId,name,image){
        try {
            if(image!=null){
                image.type = image.type.replace('ì','i');
            }
            
            
            const formData = new FormData();
            formData.append("name",name);
            formData.append("image",image);
           
            formData.append("creatorId",creatorId);
            formData.append("participants",JSON.stringify([...userId,creatorId]));
            console.log("name",name);
            console.log("image",image);
            console.log("creatorId",creatorId);
            console.log("userId",userId);
            console.log("accessToken",accessToken);

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GROUP}`;
            console.log("group",url);
            const params = {
                method: "POST",
                headers:{
                    'Content-Type':'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                    
                },
                body:formData,
            };

            const response = await fetch(url,params);
            const result = await response.json();

            if(response.status !==201)throw result;
            return result;


        } catch (error) {
           throw error; 
        }

    }

    async getAll(accessToken){
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GROUP}`;
            const params = {
                headers:{
                    
                    Authorization: `Bearer ${accessToken}`,
                    
                },
            };
            console.log("url",url);
            console.log("accessToken",accessToken);
            const response = await fetch(url,params);
            const result = await response.json();
            console.log("resultXXX",result);
            if(response.status !==200)throw result;
            return result;
           

        } catch (error) {
            throw error;
        }
    }

    async obtein(accessToken, groupId){
        try {
            console.log("accessTokenx",accessToken);
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GROUP}/${groupId}`;
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

    async exit(accessToken, groupId){
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GROUP_EXIT}/${groupId}`;
            const params = {
                method:"PATCH",
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
    async update(accessToken, groupId, data){
        try {
            const formData = new FormData();

            
            if(data.file && data.file.type){
                
                data.file.type = data.file.type.replace('ì','i');
            }
                
            if(data.file)formData.append("image",data.file);
            if(data.name)formData.append("name",data.name);
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GROUP}/${groupId}`;
            const params = {
                method:"PATCH",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
            };
            const response = await fetch(url,params);
            const result = await response.json();

            if(response.status !== 200)throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }
    async ban(accessToken, groupId, participantId){
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GROUP_BAN}`;
            const params = {
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${accessToken}`,
                    
                },
                body:JSON.stringify({
                    group_id:groupId,
                    user_id:participantId,
                }),
            };
            
            const response = await fetch(url,params);
            const result = await response.json();
            
            if(response.status !==200)throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
    async addParticipants(accessToken, groupId, participantsId){
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GROUP_ADD_PARTICIPANTS}/${groupId}`;
            const params = {
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${accessToken}`,
                    
                },
                body:JSON.stringify({
                    users_id:participantsId,
                }),
            };
            
            const response = await fetch(url,params);
            const result = await response.json();
            
            if(response.status !==200)throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }
    
}