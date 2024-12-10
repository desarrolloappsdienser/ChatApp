import {styles} from "../SendMedia.styles";
import { Actionsheet,Icon } from "native-base";;
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import {screens} from "../../../../../Utils";
import * as ImagePicker from 'expo-image-picker'; 



export function CameraOptions(props) {

    const {onClose, chatId} = props;
    const navigation = useNavigation();
    const openCamera = async ()  => {
        const {status} = await Camera.requestCameraPermissionsAsync();
        
        if(status !== "granted"){
            console.error("No has acptado los permisos de la camara");
        }else{
            onClose();
            navigation.navigate(screens.global.cameraScreen,{type:"chat",id:chatId,});

        }
          
        
            


    };

  return <Actionsheet.Item 
            style={[styles.option,styles.optionStart]} 
            _text={styles.optionText}
            startIcon={<Icon as={MaterialCommunityIcons} size="6" name="camera" color="primary.500"/>}
            onPress={openCamera}
                >
                
                Camara
        </Actionsheet.Item>
}