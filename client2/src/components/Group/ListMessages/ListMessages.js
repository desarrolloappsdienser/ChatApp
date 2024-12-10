import { useRef } from 'react';
import { ScrollView} from 'react-native';
import { View,Text } from 'native-base';
import {map} from "lodash";
import { ItemText } from './ItemText/ItemText';
import { ItemImage } from './ItemImage/ItemImage';
import {styles} from "./ListMessages.styles";

export  function ListMessages(props) {
  console.log("props",props);
    const {messages} = props;
    console.log("ListMessages",messages);
    const scrollViewRef = useRef();

  return (
    <ScrollView 
    style={styles.container} 
    alwaysBounceVertical={false}
    ref={scrollViewRef}
    onContentSizeChange={()=>{
        scrollViewRef.current.scrollToEnd({animated:true});
    }}
    >

      <View style={styles.content}>
        {map(messages,(message)=>{
          console.log("messageXX",message);
            if(message.type === "TEXT"){
                return <ItemText key={message._id} message={message}/>
            }
            if(message.type === "IMAGE"){
                return <ItemImage key={message._id} message={message}/>
            }    
        })}
      </View>
    </ScrollView>
  );
}