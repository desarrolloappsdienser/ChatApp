import { View, Text } from 'react-native';
import { Input } from 'native-base';
import { styles } from './Search.styles';
import {createFilter} from "react-search-input";

const KEYS_TO_FILTERS =[
  "email",
  "firstname",
  "lastname",
  "participante1.email",
  "participante1.firstname",
  "participante1.lastname",
  "participante2.email",
  "participante2.firstname",
  "participante2.lastname",

];//filtros de busqueda
export function Search(props) {

    const {data, setData} = props;
    const onSearch = (text)=> {
      const resultSearch = data.filter(createFilter(text,KEYS_TO_FILTERS));
      setData(resultSearch);
    }

  return (
    <View style={styles.content}>
      <Input placeholder='Buscar' variant="unstyled" style={styles.input} onChangeText={onSearch}/>
    </View>
  )
}