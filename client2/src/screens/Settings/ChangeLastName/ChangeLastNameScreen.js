import { View } from 'react-native'
import { styles } from './ChangeLastnameScreen.styles';
import { Input,Button } from 'native-base';
import {useFormik} from "formik";
import {initialValues,validationSchema} from "./ChangeLastNameScreen.form";
import {User} from "../../../api";
import {useAuth} from "../../../hooks";
import {useNavigation} from "@react-navigation/native";


const userController = new User();


export function ChangeLastNameScreen() {
  const navigation = useNavigation();
  const {accessToken, updateUser} = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit:async (formValue)=>{
      try {
        const updateData = {lastname: formValue.lastname};
        await userController.updateUser(accessToken,updateData);
        updateUser("lastname",formValue.lastname);
        navigation.goBack();
      } catch (error) {
        console.error(error);
      }

    }
  });




  return (
    <View style={styles.content}>
      <Input 
        placeholder="Apellidos"
        style={[styles.input, formik.errors.lastname && styles.inputError]}
        variant = "unstyled"
        autofocus
        value = {formik.values.lastname}
        onChangeText={(text)=> formik.setFieldValue("lastname",text)}
      />
      <Button style={styles.btn} onPress={formik.handleSubmit} isLoading = {formik.isLoading}>Cambiar</Button>  
    </View>
  )
}