import { View, Pressable } from 'react-native';
import { Avatar,Input,Icon,IconButton,CheckIcon } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './Form.form';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";
import { imageExpoFormat } from '../../../../Utils';
import { Group } from '../../../../api';
import {useAuth} from "../../../../hooks";
import {styles} from "./Form.styles";

const groupController = new Group();

export function Form(props) {

    const{usersId} = props;
    const navigation = useNavigation();
    const {accessToken,user} = useAuth();

    const formik = useFormik({
        
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const {name,image} = formValue;
                
                
               await groupController.create(
                accessToken,
                user._id,
                usersId,
                name,
                image
               ); 
               navigation.goBack();

            } catch (error) {
              console.error(error);  
            }
        },
    });

    useEffect(() => {
        navigation.setOptions({
            headerRight:()=>(
                <IconButton icon={<CheckIcon size="lg"/>} padding={0} onPress={formik.handleSubmit}/>

        ),
        });
    }, [])
    
    const openGallery = async ()=>{
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:false,
            quality:1,
        });
        if(!result.canceled){
            const file = imageExpoFormat(result.assets[0].uri);
            formik.setFieldValue("image",file);

        }
    };
/*
<Pressable onPress={openGallery}>
        <Avatar bg="cyan.500" size="xl" style={[styles.image, formik.errors.image && styles.imageError]} source={{uri:formik.values.image.uri || null}}>
            <Icon as={MaterialCommunityIcons} size="9" name="camera" color="primary.50"/>

        </Avatar>
      </Pressable>
*/
  return (
    <View style={styles.content}>
      <Pressable onPress={openGallery}>
        <Avatar bg="cyan.500" size="xl" style={[styles.image, formik.errors.image && styles.imageError]} source={{uri:formik.values.image.uri || null}}>
            <Icon as={MaterialCommunityIcons} size="9" name="camera" color="primary.50"/>

        </Avatar>
      </Pressable>
      <Input 
        placeholder="Nombre del grupo" 
        style={[styles.input,formik.errors.name && styles.inputError]} 
        variant="unstyled" 
        value={formik.values.name} 
        onChangeText={(text)=>formik.setFieldValue("name",text)}/>
    </View>
  )
}