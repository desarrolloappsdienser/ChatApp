import {useState,useEffect} from 'react';
import { useRoute } from '@react-navigation/native';
import { View } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeaderGroup } from '../../components/Navigation';
import { GroupMessage,UnreadMessages } from '../../api';
import {size} from "lodash";
import { useAuth } from '../../hooks';
import {LoadingScreen} from "../../components/Shared";
import { ListMessages } from '../../components/Group/ListMessages';
import { GroupForm } from '../../components/Group';
import { ENV,socket } from '../../Utils';


const groupMessageController = new GroupMessage();
const unreadMessagesController = new UnreadMessages();

export function GroupScreen() {
console.log("XXXXXAAA",useRoute());
  const{params:{groupid},}=useRoute();
  const {accessToken}= useAuth();
  const [messages,setMessages] = useState(null);

  useEffect(() => {
    (async ()=>{
     try {
      const response = await groupMessageController.getAll(accessToken,groupid);
      console.log("XXXXGROUPSCREEN",response.messages);
      setMessages(response.messages);
      unreadMessagesController.setTotalReadMessages(groupid,response.total);
      
     } catch (error) {
      console.error(error);
     }
    })(); 

    return async ()=>{
      const response = await groupMessageController.getAll(accessToken,groupid);
      unreadMessagesController.setTotalReadMessages(groupid,response.total);
    };
      
   }, [groupid]);

  useEffect(() => {
   (async ()=>{
    await AsyncStorage.setItem(ENV.ACTIVE_GROUP_ID,groupid);
   })(); 
  return async ()=>{
    await AsyncStorage.removeItem(ENV.ACTIVE_GROUP_ID);
  };    
  }, [groupid]);

   useEffect(() => {
    socket.emit("subscribe",groupid);//nos subscribimos
    socket.on("message",newMessage);//escuchamos

      return () => {
        socket.emit("unsubscribe",groupid);
        socket.off("message",newMessage);
      };
  
  }, [groupid,messages]);

  
  const newMessage = (msg)=> {
    setMessages([...messages,msg]);
  };


   //if(!messages) return <LoadingScreen/>;
  
  return (
    <>
      <HeaderGroup groupid={groupid}/>
      {!messages ? (
        <LoadingScreen/>
      ):(
        <View flex={1}>        
        <ListMessages messages={messages}/> 
        <GroupForm groupid={groupid}/>
        </View>
      )}
    </>
  );
}