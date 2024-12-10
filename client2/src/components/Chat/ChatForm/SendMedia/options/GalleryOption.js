import { styles } from '../SendMedia.styles';
import { Actionsheet,Icon } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import { ChatMessage } from '../../../../../api/chatMessage';
import { imageExpoFormat } from '../../../../../Utils';


const chatMessageController = new ChatMessage();

export  function GalleryOption(props) {
    const {onClose, chatId,accessToken} = props;
    const openGallery = async ()=>{
      const result = await ImagePicker.launchImageLibraryAsync({
        madiaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality:1,
      });
    if(!result.canceled){
      console.log("URI",result.assets[0].uri);

      sendImage(result.assets[0].uri);
    }
    
    };

    const sendImage = async (uri)=>{
      try {
        const file = imageExpoFormat(uri);
        await chatMessageController.sendImage(accessToken,chatId,file);
        onClose();
      } catch (error) {
        console.error(error);
      }
    }

  return (
    <Actionsheet.Item 
    style={[styles.option, styles.optionEnd]}
    _text={styles.optionText} 
    onPress={openGallery} 
    startIcon={<Icon as={MaterialCommunityIcons} 
    size = "6" 
    name="image" 
    color="primary.500"/>}>
      Galeria
    </Actionsheet.Item>
  )
}