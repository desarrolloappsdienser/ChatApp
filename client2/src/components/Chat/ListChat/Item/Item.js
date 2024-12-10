import { View, Text,TouchableOpacity } from 'react-native';
import { styles } from './Item.styles';
import { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'native-base';
import {isEmpty} from "lodash";
import { ENV,screens,socket } from '../../../../Utils';
import { useAuth } from '../../../../hooks';
import { ChatMessage } from '../../../../api/chatMessage';
import { UnreadMessages } from '../../../../api/unreadMessages';
import { Chat } from '../../../../api/chat';
import { DateTime } from 'luxon';
import { AlertConfirm } from '../../../Shared/AlertConfirm';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';


const chatMessageController=new ChatMessage();
const unreadMessagesController = new UnreadMessages();
const chatController=new Chat();


export function Item(props) {
    const {chat,onReload,upTopChat} = props;
    const {participante1,participante2} = chat;
    const {accessToken,user} = useAuth();
    const [lastMessage, setLastMessage] = useState(null);
    const [totalUnreadMessages, setTotalUnreadMessages]=useState(0);
    const [showDelete, setShowDelete]=useState(false);
    const navigation = useNavigation();
   

    

    useEffect(()=>{
        (async () =>{
            try {
                const totalMessages = await chatMessageController.getTotal(
                    accessToken,
                    chat._id
                );
                const totalReadMessages = await unreadMessagesController.getTotalReadMessages(chat._id);

                setTotalUnreadMessages(totalMessages-totalReadMessages);
            } catch (error) {
                console.error(error);
            }
        })();
    },[chat._id]);

    useEffect(()=>{
        (async () =>{
            try {
                const response = await chatMessageController.getLastMessage(
                    accessToken,
                    chat._id
                );
                if(!isEmpty(response)) setLastMessage(response);
            } catch (error) {
                console.error(error);
            }
        })();
    },[chat._id]);
    
    const userChat = 
    user._id === participante1._id ? participante2: participante1;

    const openCloseDelete = () => setShowDelete(prevState => !prevState);



    const openChat = () =>{
        setTotalUnreadMessages(0);
        navigation.navigate(screens.global.chatScreen,{chatId:chat._id});
        
    };

    const deleteChat = async() =>{
        try {
            console.log("delete",chat._id)
          await chatController.remove(accessToken,chat._id)  
          openCloseDelete();  
          onReload();
           /* setTimeout(()=>{
                openCloseDelete();
            },3000);*/


        } catch (error) {
            console.error(error);
        }
        
    };
    useEffect(()=>{
      socket.emit("subscribe",`${chat._id}_notify`)  //nos subscribimos al canal que esta en chat_message.js
      socket.on("message_notify",newMessage);//aki tb a notify nos subscribimos
    },[]);

    const newMessage = async (newMessage) =>{
        if(newMessage.chat === chat._id){
            if(newMessage.user._id !== user._id){
                upTopChat(newMessage.chat);
                setLastMessage(newMessage);

                const activeChatId = await AsyncStorage.getItem(ENV.ACTIVE_CHAT_ID);
                if(activeChatId !== newMessage.chat){
                    setTotalUnreadMessages((prevState)=> prevState+1);
                }
            }
        }
    };

  return (
    <>
        <TouchableOpacity style={styles.content} onPress={openChat} onLongPress={openCloseDelete}>
            <Avatar
                bg="cyan.500"
                size= "lg"
                marginRight={3}
                style={styles.avatar}
                source={{uri:userChat.avatar && `${ENV.BASE_PATH}/${userChat.avatar}`,}}
            >
                {userChat.email.substring(0,2).toUpperCase()}
            </Avatar>
            <View style = {styles.infoContent}>
                <View style = {styles.info}>
                    
                    <Text style = {styles.identity}>
                        
                        {//si tiene nombre y apellido lo pinta y sino el email
                        userChat.firstname || userChat.lastname
                            ?`${userChat.firstname || ""} ${userChat.lastname || ""}`
                            : userChat.email

                        }

                    </Text>
                    <Text style = {styles.message} numberOfLines={2}>
                        {lastMessage?.message || " "}
                    </Text>
                </View>
              
               <View style = {styles.notify}> 
                {lastMessage?(
                    <Text style = {styles.time}>
                        {DateTime.fromISO(
                            new Date(lastMessage.createdAt).toISOString()
                        ).toFormat("HH:mm")

                        }
                    </Text>
                ):null}
                {totalUnreadMessages?(
                    <View style = {styles.totalUnreadContent}>
                        <Text style = {styles.totalUnread}>
                        {totalUnreadMessages < 99 ? totalUnreadMessages: 99}
                        </Text>
                    </View>
                ):null}
                </View>
            </View>
        </TouchableOpacity>
        <AlertConfirm
            show={showDelete}
            onClose={openCloseDelete}
            textConfirm="Eliminar"
            onConfirm={deleteChat}
            title="Eliminar chat"
            message={`Estas seguro de que quieres eliminar el chat con ${userChat.email}?`}
            isDanger
        />        

    </>
    
  )
}