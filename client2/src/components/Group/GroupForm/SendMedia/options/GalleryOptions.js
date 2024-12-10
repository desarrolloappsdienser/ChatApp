import { styles } from '../SendMedia.styles';
import { Actionsheet,Icon } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import { GroupMessage } from '../../../../../api/groupMessage';
import { imageExpoFormat } from '../../../../../Utils';


const groupMessageController = new GroupMessage();

export  function GalleryOptions(props) {
    const {onClose, groupid,accessToken} = props;

    const openGallery = async ()=>{
      const result = await ImagePicker.launchImageLibraryAsync({
        madiaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality:1,
      });
    if(!result.canceled){
      sendImage(result.assets[0].uri);
    }
    
    };

    const sendImage = async (uri)=>{
      try {
        const file = imageExpoFormat(uri);
        await groupMessageController.sendImage(accessToken,groupid,file);
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