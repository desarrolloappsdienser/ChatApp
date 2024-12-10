import { SafeAreaView,View,Text,Image } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {screens} from "../../../Utils";
import {assets} from "../../../assets";
import {styles} from "./AuthStartScreen.styles";



export function AuthStartScreen() {
  
  const navigation = useNavigation();

  const goToLogin = ()=>{
    navigation.navigate(screens.auth.loginScreen)
  }

  return (
    <SafeAreaView>
      <Image source={assets.image.jpg.chat} style={styles.img}/>

      <View>
        <Text style={styles.title}>Te damos la bienvenida a ChatApp</Text>
        <Text style={styles.description}>
          Recomendamos el uso del chat con responsabilidad
        </Text>
        <Text style={styles.description}>
          Consulta nuestra politica de privacidad. Pulsa "Aceptar y continuar"
          para aceptar las Condiciones del servicio.
        </Text>
        <Text style={styles.btn} onPress = {goToLogin}>Aceptar y Continuar</Text>
      </View>

    </SafeAreaView>
  )
}
