import {useEffect, useCallback,useState}  from 'react';
import { View, Text } from 'react-native';
import {useNavigation,useFocusEffect} from "@react-navigation/native";
import {IconButton,AddIcon} from "native-base";
import {screens} from "../../Utils";
import { Chat } from '../../api/chat';
import {useAuth} from '../../hooks';
import {LoadingScreen} from "../../components/Shared";
import {ListChat,Search} from "../../components/Chat";
import {size} from "lodash";


const chatController = new Chat();


export function ChatsScreen() {
  const navigation = useNavigation();
  const {accessToken} = useAuth();
  const [chats, setChats] = useState(null);
  const[chatResult,setChatsResult] = useState(null);
  const [reload, setReload]=useState(false);

  const onReload = () => setReload((prevState) => !prevState);

  useEffect(()=>{
    navigation.setOptions({
      headerRight:()=>(
        <IconButton
          icon={<AddIcon/>}
          padding={0}
          onPress={()=>
            navigation.navigate(screens.tab.chats.createChatScreen)
          }
        />
      ),
    });
  },[]);

  useFocusEffect(
    useCallback(()=>{
      (async () =>{
        try {
          
          const response = await chatController.getAll(accessToken);
          
          const result = response.sort((a,b)=>{
            let a_last_message_date = a.last_message_date!=null?a.last_message_date:new Date();
            let b_last_message_date = b.last_message_date!=null?b.last_message_date:new Date();
            
            return(
              new Date(b_last_message_date)-new Date(a_last_message_date)
              //new Date(b.last_message_date)-new Date(a.last_message_date)
            );
          });


          setChats(response);
          setChatsResult(response);
          
        } catch (error) {
          //console.error(error);
        }
      })();
    },[reload])

    );

    const upTopChat = (chatId)=>{
      const data = chatResult;
      const formIndex = data.map((chat)=>chat._id).indexOf(chatId);
      const toIndex = 0;

      const elemnt = data.splice(formIndex,1)[0];
      data.splice(toIndex,0,elemnt);
      setChats([...data]);

    };
  
if(!chatResult)return <LoadingScreen/>

  return (
    
    <View>
      {size(chats)>0 && <Search data={chats} setData={setChatsResult}/>}
      <ListChat chats={size(chats)===size(chatResult)?chats:chatResult}
      onReload={onReload}
      upTopChat = {upTopChat}
      
      />
    </View>
  )
}