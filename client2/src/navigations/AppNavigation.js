import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {BottonTabNavigation} from "./ButtonTabNavigation";
import {screens, initSockets} from "../Utils";
import {UserProfileScreen,CameraScreen,ImageFullScreen,} from "../screens/Global";
import {styles} from "./Styles.styles";
import {ChatScreen} from "../screens/Chats";
import {GroupProfileScreen,GroupScreen,AddUserGroupScreen,ChangeNameGroupscreen,} from "../screens/Groups";


initSockets();

const Stack = createNativeStackNavigator();

export function AppNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screens.tab.root}
        component={BottonTabNavigation}
        options={{headerShown:false}}
      />
      <Stack.Screen
        name={screens.global.groupScreen}
        component={GroupScreen}
        options={{headerShown:false,...styles.stackNavigationStyles}}
      />
      <Stack.Screen
        name={screens.global.chatScreen}
        component={ChatScreen}
        options={{headerShown:false,...styles.stackNavigationStyles}}
      />
      <Stack.Group screenOptions={{presentation:"modal",...styles.modalStyles}}>
        <Stack.Screen
          name={screens.global.userProfileScreen}
          component={UserProfileScreen}
          options={{title:"Info.del usuario"}}
        />
        <Stack.Screen
          name={screens.global.groupProfileScreen}
          component={GroupProfileScreen}
          options={{title:"Info.del grupo"}}
        />
        <Stack.Screen
          name={screens.global.addUserGroupScreen}
          component={AddUserGroupScreen}
          options={{title:"Añadir participante"}}
        />
        <Stack.Screen
          name={screens.global.changeNameGroupScreen}
          component={ChangeNameGroupscreen}
          options={{title:"Cambiar nombre del grupo"}}
        />
        <Stack.Screen
          name={screens.global.cameraScreen}
          component={CameraScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name={screens.global.imageFullScreen}
          component={ImageFullScreen}
          options={{headerShown:false}}
        />
      </Stack.Group>


    </Stack.Navigator>
  );
}