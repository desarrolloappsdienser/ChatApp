import { View, Text, TouchableOpacity, Button } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {styles} from "./Options.styles";
import * as ImagePicker from "expo-image-picker";

import {imageExpoFormat,screens} from "../../../Utils";
import {User} from "../../../api";



const userController = new User();



export function Options(props) {
   
const{ accessToken, logout,updateUser } = props;
const navigation = useNavigation();


const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality:1,
    });
    
    
    if(!result.canceled){
        
      
      const file = imageExpoFormat(result.assets[0].uri);
      
      updateUserData(file);
      //updateUserData({avatar:file});
      

    }
        


};

const updateUserData = async (userdata) => {
    try {
      
        const response = await userController.updateUser(accessToken,userdata);
        console.log("XXXXXXXXXX",response);
        //Con esto actualizo en tiempo real
        updateUser("avatar",response.avatar)
    } catch (error) {
        console.error(error);
    }
};

const goChangeFirstName = () =>{
  navigation.navigate(screens.tab.settings.changeFirstNameScreen);
};

const goChangeLastName = () =>{
  navigation.navigate(screens.tab.settings.changeLastNameScreen)
}
 



  return (
    <View style = {styles.content}>

      <TouchableOpacity style = {styles.item} onPress={openGallery}>
        <Text style = {styles.text}>Cambiar foto de perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style = {styles.item}>
        <Text style = {styles.text} onPress = {goChangeFirstName}>Cambiar nombre</Text>
      </TouchableOpacity>

      <TouchableOpacity style = {styles.item}>
        <Text style = {styles.text} onPress = {goChangeLastName}>Cambiar apellidos</Text>
      </TouchableOpacity>

      <TouchableOpacity style = {(styles.item, styles.itemClose)} onPress={logout}>
        <Text style = {styles.textClose}>Cerrar sesión</Text>
      </TouchableOpacity>

      
    </View>

    
  )
}