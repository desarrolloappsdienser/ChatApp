import { View } from 'react-native';
import { Button,Input } from 'native-base';
import {useRoute, useNavigation} from "@react-navigation/native";
import {useFormik} from "formik";
import {initialValues, validationSchema} from "./ChangeNameGroupscreen.form";
import {Group} from "../../../api";
import { useAuth } from '../../../hooks';
import {styles} from "./ChangeNameGroupscreen.styles";

const groupController = new Group();

export function ChangeNameGroupscreen() {

  const navigation = useNavigation();
  const {params} = useRoute();
  const {accessToken} = useAuth();

  const formik = useFormik({
    initialValues: initialValues(params.groupName),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async(formValue)=>{
      try {
        
        await groupController.update(accessToken, params.groupid,{
          name:formValue.name,
        });
        navigation.goBack();
        navigation.goBack();
        navigation.goBack();
        console.log("ENVIADO");
        console.log(formValue);
      } catch (error) {
        console.error(error);
      }
    }
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder="Nombre del grupo"
        variant="unstyled"
        value={formik.values.name}
        onChangeText={(text)=>formik.setFieldValue("name",text)}
        style={[styles.input,formik.errors.name && styles.inputError]}
      />
      <Button 
         
        onPress={formik.handleSubmit} 
        isLoading={formik.isSubmitting}
        style={styles.btn}>
        Cambiar
      </Button>
    </View>
  );
}