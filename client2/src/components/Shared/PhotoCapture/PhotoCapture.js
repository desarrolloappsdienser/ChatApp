import {View} from 'react-native';
import { styles } from './PhotoCapture.styles';
import { useState } from 'react';
import { IconButton,CloseIcon,Icon,Image, Spinner } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
//envio al chat
import {ChatMessage} from "../../../api/chatMessage";
import {useAuth} from "../../../hooks";
import {imageExpoFormat} from "../../../Utils";

const chatMessageContraller = new ChatMessage();
//fin envio chat
export function PhotoCapture(props) {
    
    const {photo,type,id} = props;
    const [loading,setLoading] = useState(false);
    const navigation=useNavigation();

    const {accessToken}= useAuth();//envio al chat

    const sendMedia = async ()=>{
        try {
            setLoading(true);
            //envio chat
            console.log("PhotoCapture",accessToken);
            const file = imageExpoFormat(photo);
            
            if(type==="chat"){
                await chatMessageContraller.sendImage(accessToken,id,file);
            }    
            //fin envio chat


            setLoading(false);
            navigation.goBack();

            
        } catch (error) {
            console.error(error);
            
        }
    };
/**<Image 
      //source={{uri:photo}} 
      alt="photo" style={styles.photo}
      
      /> */
  return (
    <View style={styles.container}>
      
      <View style={styles.topActions}>
        <IconButton icon={null}/>
        <IconButton 
            onPress={navigation.goBack}
            icon={<CloseIcon style={styles.icon} size="8"/>}/>
        <IconButton icon={null}/>
      </View>
      <View style={styles.bottomActions}>
        <IconButton icon={null}/>
        {
            loading ?(
                <Spinner size="lg"/>
            ):(
                <IconButton
                    onPress={sendMedia}
                    icon={
                        <Icon as={MaterialCommunityIcons} size="20" name="check-circle-outline" style={styles.icon}/>
                    }
                
                />
            )}
        <IconButton icon={null}/>    
      </View>
    </View>
  )
}