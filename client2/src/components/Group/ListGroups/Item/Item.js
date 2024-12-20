import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'native-base';
import { ENV,screens, socket } from '../../../../Utils';
import { GroupMessage } from '../../../../api/groupMessage';
import { UnreadMessages } from '../../../../api'; 
import { useEffect,useState } from 'react';
import {useAuth} from "../../../../hooks";
import {isEmpty} from "lodash";
import {DateTime} from "luxon";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './Item.style';

const groupMessageController = new GroupMessage();
const unreadMessagesController = new UnreadMessages();

export function Item(props) {
    const {group, upGroupChat} = props;
    const {accessToken,user} = useAuth();
    const [totalUnreadMessages, setTotalUnreadMessages] = useState(10);
    const [lastMessages, setlastMessages] = useState(null);
    const navigation = useNavigation();
    const nombre = group.name;

    useEffect(() => {
      (async ()=>{
        try {
          const totalMessages = await groupMessageController.getTotal(
            accessToken,
            group._id
          );
          

          const totalReadMessages = await unreadMessagesController.getTotalReadMessages(group._id);
          
          setTotalUnreadMessages(totalMessages - totalReadMessages);
        } catch (error) {
          console.error(error);
        }
      })()
    }, [group._id]);

    useEffect(() => {
      (async ()=>{
        try {
          const response = await groupMessageController.getLastMessage(
            accessToken,
            group._id
          );


        if(!isEmpty(response)) setlastMessages(response);  

        } catch (error) {
          
        }


      })()
    }, [group._id]);
    
    useEffect(() => {
      //nos subscrinbimos al groupmesage del server
      socket.emit("subscribe",`${group._id}_notify`);
      socket.on("message_notify",newMessage);

    }, []);

    const newMessage = async (newMsg) =>{
      if(newMsg.group === group._id){
        if(newMsg.user._id !== user._id){
          upGroupChat(newMsg.group);
          setlastMessages(newMsg);

          const activeGroupId = await AsyncStorage.getItem(ENV.ACTIVE_GROUP_ID);
          if(activeGroupId !== newMsg.group){
            setTotalUnreadMessages((prevState)=>prevState + 1);
          }
        }

      }
    };
    

    const openGroup=()=>{
      setTotalUnreadMessages(0);
      navigation.navigate(screens.global.groupScreen,{groupid:group._id});
    };

    

  return (
    <TouchableOpacity style={styles.content} onPress={openGroup}>
      <Avatar 
        bg="cyan.500"
        size={"lg"}
        marginRight={3}
        style={styles.avatar}
        source={{uri:`${ENV.BASE_PATH}/${group.image}`}}
      />
      <View style={styles.infoContent}>
        
        <View style={styles.info}>
            <Text style={styles.name}>{group.name}</Text>
                        
            <Text style={styles.message} numberOfLines={2}>
                <Text>
                  {lastMessages? `${lastMessages.user?.firstname || lastMessages.user.email}:`:" "}
                </Text>

                <Text style={styles.text}>
                  {lastMessages ? lastMessages.message:" "}
                </Text>
            </Text>
        </View>

        <View style={styles.notify}>
        {lastMessages ?<Text style={styles.time}>{DateTime.fromISO(new Date(lastMessages.createdAt).toISOString()).toFormat("HH:mm")}</Text>:null}
        {totalUnreadMessages? (
            <View style={styles.totalUnreadContent}>
                <Text style={styles.totalUnread}>
                    {totalUnreadMessages < 99 ? totalUnreadMessages : 99}
                </Text>
            </View>
           ) : null}
            
        </View>

      </View>
    </TouchableOpacity>
  )
}