import {useEffect,useState} from 'react';
import { Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {HeaderChat} from "../../components/Navigation/HeaderChat";
import { ChatMessage } from '../../api/chatMessage';
import {UnreadMessages} from '../../api/unreadMessages';
import { useAuth } from '../../hooks';
import {LoadingScreen} from '../../components/Shared/LoadingScreen';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { ENV,socket } from '../../Utils';
import {View} from "native-base";
import { ListMessages } from '../../components/Chat/ListMessages';
import { ChatForm } from '../../components/Chat';



const chatMessageController = new ChatMessage();
const unreadMessagesController = new UnreadMessages();

export function ChatScreen() {
  const { params:{chatId},}=useRoute();
  const [messages, setMessages] = useState(null);
  const {accessToken} = useAuth();

  useEffect(() => {
    (async ()=>{

      try {
        const response = await chatMessageController.getAll(
          accessToken,chatId
        );
        setMessages(response.messages);
        unreadMessagesController.setTotalReadMessages(chatId,response.total);//con esto hacemos que cuando entramos en chat se quitan los numeros de sms sin leer
      } catch (error) {
        console.error(error);
      }
    })();
  
    return async () => {
      const response = await chatMessageController.getAll(
        accessToken,chatId
      );

      unreadMessagesController.setTotalReadMessages(chatId,response.total);//estos son todos los mensajes que ha leido
    }
  }, [chatId]);
//este useEfect se va aejecutar cada vez que chatId se modifique
  useEffect(() => {
    (async()=>{
        await AsyncStorage.setItem(ENV.ACTIVE_CHAT_ID,chatId);
    })();

    return async () =>{
      await AsyncStorage.removeItem(ENV.ACTIVE_CHAT_ID);
    };
  }, [chatId]);

  useEffect(() => {
    socket.emit("subscribe",chatId);//nos subscribimos
    socket.on("message",newMessage);//escuchamos

      return () => {
        socket.emit("unsubscribe",chatId);
        socket.off("message",newMessage);
      };
  
  }, [chatId,messages]);
  const newMessage = (msg)=> {
    setMessages([...messages,msg]);
  };

  
  

  return (
    <>
      <HeaderChat chatId={chatId}/>
      
      {!messages ? (
        <LoadingScreen/>
      ):(
        <View flex={1}>
          <ListMessages messages = {messages}/>
          <ChatForm chatId={chatId}/>
        </View>
      )}
    </>
    
  );
}