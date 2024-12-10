import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SettingsScreen,ChangeFirstNameScreen,ChangeLastNameScreen} from "../../screens/Settings";
import {screens} from "../../Utils";
import {styles} from "../Styles.styles";

const Stack = createNativeStackNavigator();

export function SettingsNavigation() {
  return (
    <Stack.Navigator
    screenOptions={{
        ...styles.stackNavigationStyles,
    }}
   >
    <Stack.Screen
        name={screens.tab.settings.settingScreen}
        component={SettingsScreen}
        options={{
            headerShown:false
        }}
    />

    <Stack.Screen
        name={screens.tab.settings.changeFirstNameScreen}
        component={ChangeFirstNameScreen}
        options={{
            title:"Cambiar Nombre",
            presentation:"modal"
        }}
    />

    <Stack.Screen
        name={screens.tab.settings.changeLastNameScreen}
        component={ChangeLastNameScreen}
        options={{
            title:"Cambiar Apellidos",
            presentation:"modal"
        }}
    />
    

   </Stack.Navigator>
  )
}