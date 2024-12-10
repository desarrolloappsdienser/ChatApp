//const SERVER_IP = "192.168.154.160:3977";
const SERVER_IP = "192.168.1.123:3977";

export const ENV = {
    SERVER_IP: SERVER_IP,
    BASE_PATH: `http://${SERVER_IP}`,
    API_URL: `http://${SERVER_IP}/api`,
    SOCKET_URL:`http://${SERVER_IP}`,
    ENDPOINTS:{
        AUTH:{
            REGISTER:"auth/register",
            LOGIN: "auth/login",
            REFRESH_ACCESS_TOKEN: "auth/refresh_access_token",
        },
        ME:"user/me",
        USER:"user",
        USER_EXCEPT_PARTICIPANTS_GROUP: "users_except_participants_group",
        CHAT:"chat",
        CHAT_MESSAGE:"chat/message",
        CHAT_MESSAGE_IMAGE: "chat/message/image",
        CHAT_MESSAGE_LAST: "chat/message/last",
        CHAT_MESSAGE_TOTAL: "chat/message/total",
        GROUP:"group",
        GROUP_EXIT: "group/exit",
        GROUP_BAN: "group/ban",
        GROUP_ADD_PARTICIPANTS:"group/add_participants",
        GROUP_MESSAGE: "group/message",
        GROUP_MESSAGE_IMAGE: "group/message/image",
        GROUP_MESSAGE_TOTAL: "group/message/total",
        GROUP_MESSAGE_LAST: "group/message/last",
        
    },
    JWT:{
        ACCESS: "access",
        REFRESH: "refresh",
    },
    
    ACTIVE_CHAT_ID:"active_chat_id",
    ACTIVE_GROUP_ID:"active_group_id",

};