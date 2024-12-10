import { ScrollView } from 'react-native';
import { View,Text } from 'native-base';
import {styles} from "./ListMessages.styles";
import {map} from "lodash";
import { ItemText } from './ItemText/ItemText';
import { ItemImage } from './ItemImage/ItemImage';
import {useRef} from 'react';
//<ItemImage key={message._id} message={message}/>
export  function ListMessages(props) {
    
    const {messages} = props;
    const scrollViewRef = useRef();
    
  return (
    <ScrollView style={styles.container} alwaysBounceVertical={false} ref={scrollViewRef} onContentSizeChange={()=>{scrollViewRef.current.scrollToEnd({animated:true});}}>
      <View style={styles.content}>
        {map (messages,(message)=>{
            if(message.type === "TEXT"){
                return <ItemText key={message._id} message={message}/>
            }
            if(message.type === "IMAGE"){
                return <ItemImage key={message._id} message={message}/>
                    
            }
        })}
      </View>
    </ScrollView>
  )
}