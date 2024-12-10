import { View} from 'react-native';
import { Input,Button } from 'native-base';
import { styles } from './ChangeFirstNameScreen.styles';
import {useFormik} from "formik";
import {initialValues,validationSchema} from "./ChangeFirstNameScreen.form";
import {User} from "../../../api";
import {useAuth} from "../../../hooks";
import {useNavigation} from "@react-navigation/native";

const userController = new User();

export function ChangeFirstNameScreen() {

  const navigation = useNavigation();
  const {accessToken, updateUser} = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit:async (formValue)=>{
      try {
        const dataUser = {firstname: formValue.firstname};
        await userController.updateUser(accessToken,dataUser);
        updateUser("firstname",formValue.firstname);
        navigation.goBack();
      } catch (error) {
        console.error(error);
      }

    }
  });




  return (
    <View style={styles.content}>
      <Input 
        placeholder="Nombre"
        style={[styles.input, formik.errors.firstname && styles.inputError]}
        variant = "unstyled"
        autofocus
        value = {formik.values.firstname}
        onChangeText={(text)=> formik.setFieldValue("firstname",text)}
      />
      <Button style={styles.btn} onPress={formik.handleSubmit} isLoading = {formik.isLoading}>Cambiar</Button>  
    </View>
  )
}