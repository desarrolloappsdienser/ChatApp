import { View, Text,ScrollView } from 'react-native';
import React from 'react';
import {styles} from "./ListChat.styles";
import {map, size} from "lodash";
import { Item } from './Item/Item';

export  function ListChat(props) {
    const {chats,onReload,upTopChat} = props;
    
  return (
    <ScrollView alwaysBounceVertical={false}>
      <View style={styles.content}>
        {size(chats)===0? (
            <Text style={styles.noChats}>
                No tienes ningún chat, dale al (+) y empieza una nueva conversación
            </Text>
        ):null}
        {map(chats,(chat)=>(
            <Item key={chat._id} chat={chat} onReload={onReload} upTopChat={upTopChat}/>
        ))}
      </View>
    </ScrollView>
  )
}