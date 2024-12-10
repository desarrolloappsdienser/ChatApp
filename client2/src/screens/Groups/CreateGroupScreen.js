import {useState,useEffect} from 'react';
import { View, Text } from 'react-native';
import { IconButton,CloseIcon } from 'native-base';
import {useNavigation} from "@react-navigation/native";
import {User} from "../../api";
import {useAuth} from "../../hooks";
import {CreateGroup,Search} from "../../components/Group";

const userController = new User();

export function CreateGroupScreen() {
  const [users,setUsers] = useState(null);
  const [userResult, setUserResult] = useState(null);
  const [step, setStep] = useState(1);
  const navigation = useNavigation();
  const {accessToken} = useAuth();

  const [usersId, setUsersId] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft:()=>(
        <IconButton 
          icon = {<CloseIcon/>}
          padding={0}
          onPress={navigation.goBack}  
        />

      ),
    });
     
  }, [step]);

  useEffect(() => {
    (async()=>{
      try {
        const response = await userController.getAll(accessToken);
        setUsers(response);
        setUserResult(response);
      } catch (error) {
        console.error(error);
      }
    })()
  }, []);

  const nextStep = ()=> setStep((prevState)=> prevState + 1);
  
  if(!userResult)return null;


  return (
    <View>
      {step===1 &&(
        <>
        <Search data={users} setData={setUserResult}/>
        <CreateGroup.ListUser users={userResult} nextStep={nextStep} setUsersId = {setUsersId}/>
        </>
      )}

      {step===2 &&(
        <CreateGroup.Form usersId={usersId}/>
      )}

    </View>
  )
}