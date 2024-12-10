import { View, Keyboard,Platform } from 'react-native';
import {styles} from "./ChatForm.styles";
import { Input,IconButton,Icon } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState,useEffect } from 'react';
import { useAuth } from '../../../hooks';
import { useFormik } from 'formik';
import { ChatMessage } from '../../../api/chatMessage';
import { initialValues,validationSchema } from './ChatForm.form';
import { SendMedia } from './SendMedia';



const chatMessageController = new ChatMessage();

export function ChatForm(props) {
    const [keyboardHeight,setKeyboardHeight] = useState(0);
    const {chatId} = props;
    const {accessToken} =useAuth();

    useEffect(() => {
      const showKeyboardSub = Keyboard.addListener("keyboardDidShow",(e)=>{
           const {startCoordinates} = e;
           if(Platform.OS === "ios"){
            setKeyboardHeight(startCoordinates.height+65);
           }
          
      });
      const hideKeyboardSub = Keyboard.addListener("keyboardDidHide",()=>{
           setKeyboardHeight(0);
   });
    
      return () => {
        showKeyboardSub.remove();
        hideKeyboardSub.remove();
      }
    }, []);

    const formik = useFormik({
        initialValues:initialValues(),
        validationSchema:validationSchema(),
        validateOnChange:false,
        onSubmit: async (formValue)=>{
            try {
               setKeyboardHeight(0);
               Keyboard.dismiss();
                
               await chatMessageController.sendText(accessToken,chatId,formValue.message);

               formik.handleReset();
                
            } catch (error) {
                console.error(error);
            }
        }
    });
    

  return (
    <View style={[styles.content,{bottom:keyboardHeight}]}>
      <SendMedia chatId={chatId}/>
      <View style={styles.inputContainer}>
        <Input
            placeholder='Enviar un mensaje...'
            style={styles.input}
            variant="unstyled"
            value={formik.values.message}
            onChangeText={(text)=>formik.setFieldValue("message",text)}
            onEndEditing={!formik.isSubmitting && formik.handleSubmit}
        />
        <IconButton
            icon={<Icon as={MaterialCommunityIcons} name='send'/>}
            padding={0}
            style={styles.iconSend}
            onPress={!formik.isSubmitting && formik.handleSubmit}
        />
      </View>
    </View>
  )
}