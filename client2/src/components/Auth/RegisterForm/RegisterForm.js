import { View } from 'react-native';
import {Input,Button} from "native-base";
import {useNavigation} from "@react-navigation/native";
import {useFormik} from "formik";//esto vale para controlar el formulario
import {Auth} from "../../../api";
import {initialValues,validationSchem} from "./RegisterForm.form";//nos traemos los dos metodos
import {styles} from "./RegisterForm.styles";

const authController = new Auth();

export function RegisterForm() {
  
  const navigation = useNavigation();

  //este codigo se va a ejecutar solo si las validaciones son correctas
   const formik = useFormik({
    initialValues:initialValues(),
    validationSchema:validationSchem(),
    validateOnChange:false,
    onSubmit: async (formValue) => {
      try {
        console.log("formValue",formValue);
        await authController.register(formValue.email, formValue.password);
        navigation.goBack();

      } catch (error) {
        console.error(error);
        
      }
    },
  });
  return (
    <View>
      <View style={styles.viewInput}>
        <Input 
            placeholder='Correo electrónico'
            variant= "unstyled"
            autoCapitalize={false}
            value={formik.values.email}
            onChangeText={(text)=>formik.setFieldValue("email",text)}
            style={[styles.input, formik.errors.email && styles.inputError]}
            />
        
        <Input
           placeholder='Contraseña'
           variant= "unstyled"
           secureTextEntry
           value={formik.values.password} 
           onChangeText={(text) => formik.setFieldValue("password",text)}
           style={[styles.input, formik.errors.password && styles.inputError]}
        />

        <Button 
          style={styles.btn} 
          onPress={formik.handleSubmit}
          isLoading={formik.isSubmitting} 
          
          >CREAR CUENTA</Button>
      </View>
    </View>
  )
}