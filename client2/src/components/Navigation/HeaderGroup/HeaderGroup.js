import { useState,useEffect } from 'react';
import { SafeAreaView, Text,View,Pressable } from 'react-native';
import { IconButton,ChevronLeftIcon,Avatar } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { ENV,screens } from '../../../Utils';
import {Group} from "../../../api";
import { styles } from './HeaderGroup.styles';
import { useAuth } from '../../../hooks';

const groupController = new Group();

export function HeaderGroup(props) {
const {groupid} = props;
const navigation = useNavigation();
const {accessToken} = useAuth();
const [group, setGroup] = useState(null);


useEffect(() => {
  (async () =>{
    try {
      const response = await groupController.obtein(accessToken,groupid);  
      setGroup(response);
    } catch (error) {
       console.error(error); 
    }
  })();
}, [groupid])


const goToGroupProfile = () =>{
    navigation.navigate(screens.global.groupProfileScreen,{
        groupid,
    })
}

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.info}>
            <IconButton
                icon={<ChevronLeftIcon/>}
                padding={0}
                onPress={navigation.goBack}
            />

            {group && (
                <Pressable onPress={goToGroupProfile} style={styles.info}>
                    <Avatar
                        bg={'cyan.500'}
                        marginRight={3}
                        size="sm"
                        style={styles.avatar}
                        source={{uri:`${ENV.BASE_PATH}/${group.image}`}}
                    />
                    <Text style={styles.name}>{group.name}</Text>
                </Pressable>
            )}
        </View>
      </View>
    </SafeAreaView>
  );
}