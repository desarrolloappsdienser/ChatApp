import { View, Text } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {screens} from "../../../Utils";
import {styles} from "./LoginScreen.styles";
import { LoginFom } from "../../../components/Auth";
export function LoginScreen() {
  const navigation = useNavigation();

  const goToRegister = ()=>{
    navigation.navigate(screens.auth.registerScreen);
  }

  return (
    <View style = {styles.contect}>
      <Text style = {styles.title}>Entra y empieza a chatear</Text>

      <LoginFom/>
    
      <Text style = {{color:"#fff"}}>LoginForm</Text>
    
      <Text style = {styles.register} onPress={goToRegister}>Registrarse</Text>
    
      <Text style = {styles.info}>Esto es información adicional</Text>
    </View>


  );
}

