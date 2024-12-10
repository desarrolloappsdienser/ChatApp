import { View, Text, TouchableOpacity } from 'react-native';
import {size,map} from "lodash";
import { Group } from '../../../../api';
import {Avatar,AddIcon,DeleteIcon,IconButton} from "native-base";
import { ENV,screens } from '../../../../Utils';
import { useAuth } from '../../../../hooks';
import { useNavigation } from '@react-navigation/native';
import {styles} from "./Participants.styles";

const groupController = new Group();

export  function Participants(props) {

    const {
        group:{_id,participants},
        onReload,
    } = props;

    const {accessToken,user}=useAuth();
    const navigation = useNavigation();

    const banFormGroup = async (participant) =>{
        try {
            console.log("banFormGroup");
            await groupController.ban(accessToken,_id,participant._id);
            onReload();
        } catch (error) {
            console.error(error);
        }
    };
    const openAddparticipants = () =>{
        navigation.navigate(screens.global.addUserGroupScreen,{
            groupid:_id,
        });
    };

  return (
    <View style = {styles.content}>
      <Text style={styles.title}>{size(participants)}Participantes</Text>
      <View style={styles.list}>
        <TouchableOpacity
            style={styles.participant}
            onPress={openAddparticipants}
        >
            <Avatar bg="muted.600" marginRight={3}>
                <AddIcon style={styles.AddIcon}/>
            </Avatar>   
            <Text style={styles.addParticipant}>Añadir participante</Text>
        </TouchableOpacity>
        {map(participants,(participant,index)=>(
           <View key={index} style={styles.participant}>
            <Avatar
                bg="cyan.500"
                marginRight={3}
                source={{
                    uri:
                    participant.avatar && `${ENV.BASE_PATH}/${participant.avatar}`,
                }}
            >
                {participant.email.substring(0,2).toUpperCase()}    
            </Avatar>
            <View style={styles.info}>
                <Text style={styles.identity}>
                    {participant.firstname || participant.lastname ?
                        `${participant.firstname ||""}${participant.lastname||""}`
                        :"..."
                    }

                </Text>
                <Text style={styles.email}>{participant.email}</Text> 
                {participant._id !== user._id && (
                    <IconButton
                        icon={<DeleteIcon/>}
                        onPress={()=>banFormGroup(participant)}
                        style={styles.banIcon}
                        padding={0}
                    />
                )}       
            </View>
           </View> 
        ))}
      </View>
    </View>
  );
}