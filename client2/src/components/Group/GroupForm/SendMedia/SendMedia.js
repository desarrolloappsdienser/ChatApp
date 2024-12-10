import {useState} from 'react';
import { IconButton,AddIcon,Actionsheet } from 'native-base';
import {styles} from "./SendMedia.styles";
import {GalleryOptions} from "./options/GalleryOptions";
import { CameraOptions } from './options/CameraOptions';
import { useAuth } from "../../../../hooks";

export function SendMedia(props) {

    const {groupid} = props;
    const [show,setShow] = useState(false);
    const onOpenClose = () => setShow((prevState)=>!prevState);
    const {accessToken} = useAuth();


  return (
    <>
        <IconButton icon={<AddIcon/>} padding={0} onPress={onOpenClose}/>
            <Actionsheet isOpen={show} onClose={onOpenClose}>
                <Actionsheet.Content style={styles.itemsContainer}>
                    <CameraOptions onClose={onOpenClose} groupid={groupid} />   
                    <GalleryOptions onClose= {onOpenClose} groupid={groupid} accessToken={accessToken}/>
                    <Actionsheet.Item style={[styles.option,styles.cancel]} _text={styles.cancelText} onPress={onOpenClose}>
                        Cancelar
                    </Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>
        
    </>
    
  )
}