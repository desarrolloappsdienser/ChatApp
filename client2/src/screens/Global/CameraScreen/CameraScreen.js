import {useState,useRef,useEffect} from 'react';
import { View, Text, Button, Image,Alert  } from 'react-native';
import { styles } from './CameraScreen.styles';
import {Camera} from "expo-camera";
import * as ImagePicker from 'expo-image-picker'; 
import { PhotoCapture } from '../../../components/Shared/PhotoCapture/PhotoCapture';
import { useNavigation,useRoute } from '@react-navigation/native';


//envio chat
import {ChatMessage} from "../../../api/chatMessage";
import { GroupMessage } from '../../../api';
import {useAuth} from "../../../hooks";
import {imageExpoFormat} from "../../../Utils";

const chatMessageController = new ChatMessage();
const groupMessageController = new GroupMessage();

export function CameraScreen(){

  const navigation = useNavigation();
  const {params} = useRoute();
  console.log("params",params);
  const cameraRef = useRef();
  const [photo,setPhoto]= useState(null);
  const {accessToken}= useAuth();//envio al chat




  useEffect(() => {
    (async () => {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
    });
    console.log("PASA POR AKIIII 3",result.uri);
    if (!result.canceled) {
    console.log("PASA POR AKIIII 4");
    setPhoto(result.assets[0].uri); // Guardar la URI de la imagen capturada
    }
    console.log("PASA POR AKIIII 5",cameraRef);
    })();
  }, []);

 /* const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
  });
  console.log("PASA POR AKIIII 3",result.assets[0].uri);
  if (!result.canceled) {
  console.log("PASA POR AKIIII 4");
  setPhoto(result.assets[0].uri); // Guardar la URI de la imagen capturada
  }
  console.log("PASA POR AKIIII 5");

  
  };*/
 

  const captureImage = async()=>{
    console.log("!!!!!!!!!!!!!!!!!!!!!");
    const options = {quality:1};
    const newPhoto = await cameraRef.current.takepictureAsync(options);
    setPhoto(newPhoto);
  };

  const sendMedia = async ()=>{  
    try {
        //envio chat
        const file = imageExpoFormat(photo);
        
        if(params.type==="chat"){
            await chatMessageController.sendImage(accessToken,params.id,file);
        } 
        if(params.type==="group"){
          await groupMessageController.sendImage(accessToken,params.id,file);
        }   
        //fin envio chat
     
        navigation.goBack();

        
    } catch (error) {
        console.error(error);
        
    }
  }

  if(photo){
    //phtocapture no lo usamos
    //return <PhotoCapture photo={photo} type = {params.type} id= {params.id}/>;
    sendMedia();
  }
  
  return (
    <View>
      
    </View>
    
  );
}
