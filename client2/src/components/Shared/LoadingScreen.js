import { View, Text } from 'react-native';
import { Heading, Spinner } from 'native-base';


export function LoadingScreen() {
  return (
    <View style={{flex:1, justifyContent:"center",alignItems:"center"}}>
      <Spinner size="lg"/>
      <Heading color = "primary.500" fontSize="md" marginTop={2}>
        Cargando
      </Heading>
    </View>
  )
}