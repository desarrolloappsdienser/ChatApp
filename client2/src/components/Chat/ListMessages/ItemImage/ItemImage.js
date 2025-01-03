import React, { useState } from 'react';
import { View, Text, Pressable,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {styled} from "./ItemImage.styles";
import { DateTime } from 'luxon';
import { useAuth } from '../../../../hooks';
import { ENV,screens } from '../../../../Utils';
import AutoHeightImage from 'react-native-auto-height-image';

export  function ItemImage(props) {

    const {message} = props;
    
    const {user} = useAuth();
    const isMe = user._id === message.user._id;
    const styles = styled(isMe);
    const createMessage = new Date(message.createdAt);
    const navigation = useNavigation();

    const imageUrl = `${ENV.BASE_PATH}/${message.message}`;
    const [imageHeight, setImageHeight] = useState(0);
    
    const onOpenImage = () =>{
        navigation.navigate(screens.global.imageFullScreen,{uri:imageUrl});
    };
   //<AutoHeightImage width={300} maxHeight={400} source={{uri:imageUrl}} style={styles.image} />

   const handleImageLoad = (event) => {
    const { width, height } = event.nativeEvent.source;
    const aspectRatio = height / width;
    setImageHeight(300 * aspectRatio); // Mantén una anchura de 300 y ajusta la altura.
};

  return (
    <View style={styles.content}>
      <View style={styles.message}>
        <Pressable onPress={onOpenImage} >
          <Image
            source={{ uri: imageUrl }}
            style={[styles.image, { width: 300, height: imageHeight }]}
            onLoad={handleImageLoad}
          />
        </Pressable>
        <Text style={styles.date}>
            {DateTime.fromISO(createMessage.toISOString()).toFormat("HH:mm")}
        </Text>
      </View>
    </View>
  )
}