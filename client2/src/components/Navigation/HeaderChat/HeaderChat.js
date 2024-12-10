import { useState,useEffect } from 'react';
import { View, Text, SafeAreaView,Pressable } from 'react-native';
import { IconButton,ChevronLeftIcon,DeleteIcon,Avatar } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import {Chat} from "../../../api";
import{useAuth}from "../../../hooks";
import { ENV,screens } from '../../../Utils';
import {styles} from "./HeaderChat.styles";
import { AlertConfirm } from '../../Shared/AlertConfirm';

const chatController = new Chat();

export  function HeaderChat(props) {

    const {chatId}=props;
    const [userChat,setUserChat] = useState(null);
    const navigation = useNavigation();
    const {accessToken,user} = useAuth();
    const [showDelete,setShowDelete]= useState(false);


useEffect(() => {
  (async ()=>{
    try {
       const response = await chatController.obtain(accessToken,chatId); 
       console.log("user",user);
       console.log("response",response);
       const otherUser = 
        user._id!== response.participante1._id ?
        response.participante1 :
        response.participante2;
        console.log("otherUser",otherUser);
        setUserChat(otherUser);
    } catch (error) {
        console.error(error);
    }
  })();
}, [chatId]);

const openCloseDelete = ()=>setShowDelete((prevState) => !prevState);
const deleteChat = async () => {
    try{
        await chatController.remove(accessToken,chatId);
        openCloseDelete();
        navigation.goBack();
    }catch(error){
        console.error(error);
    }
};

const goToUserProfile = () => {
    navigation.navigate(screens.global.userProfileScreen,{
        userId:userChat._id,
    });
};
  return (
    <>
    <SafeAreaView style={styles.container}>
        <View style={styles.content}>
            <View style={styles.info}>
                <IconButton icon={<ChevronLeftIcon/>} padding={0} onPress={navigation.goBack}/>
                {userChat && (
                    <Pressable
                        onPress={goToUserProfile}
                        style={styles.info}
                    >
                        <Avatar
                            bg="cyan.500"
                            marginRight={3}
                            size="sm"
                            style={styles.avatar}
                            source={{ uri:userChat.avatar && `${ENV.BASE_PATH}/${userChat.avatar}`,}}
                        >
                            {userChat.firstname ? 
                                userChat.firstname.substring(0,2).toUpperCase():
                                userChat.email.substring(0,2).toUpperCase()}
                        </Avatar>
                        <Text style={styles.identity}>
                            {userChat.firstname || userChat.lastname?
                            `${userChat.firstname || ""} ${userChat.lastname || ""}`  :userChat.email}
                        </Text>

                    </Pressable>
                )}
            </View>
            <View>
                <IconButton icon={<DeleteIcon/>} padding={0} onPress={openCloseDelete}/>
            </View>
        </View>
    </SafeAreaView>
    <AlertConfirm
        show={showDelete}
        onClose={openCloseDelete}
        textConfirm="Eliminar"
        onConfirm={deleteChat}
        title="Eliminar chat"
        message="¿Estas seguro que quieres eliminar el chat?"
        isDanger
    />
    </>
    
  )
}