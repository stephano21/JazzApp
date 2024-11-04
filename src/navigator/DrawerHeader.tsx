import React, {useContext} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {colores, iconos, styles} from '../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  DrawerActions,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {sleep} from '../helpers/sleep';
import {Loader} from '../utils/Loader/Loader';
import {IconComponent} from '../components/BaseComponents/IconComponent';
import {IconButton} from '../components/BaseComponents/IconButton';

import { Alert } from '../utils/Alert/Alert';

interface Props {
  title?: string;
}

export const DrawerHeader = ({title = ''}: Props) => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  const Catalogos = async () => {
    Loader.show();
    await sleep(2).then(Loader.hide);
  };
  
  return (
    <View
      style={{
        height: 55,
        width: '100%',
        padding:5,
        backgroundColor: colores.primary,
        ...styles.centerItems,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
    
      {title.length === 0 ? (
        <Image
          source={require('../assets/logo.png')}
          style={{
            marginLeft:0,
            height: '100%',
            width: '50%',
            resizeMode: 'contain',
            alignSelf: 'center',
          }}></Image>
      ) : (
        <Text style={{...styles.textTitle, color: colores.textPrimary}}>
          {title}
        </Text>
      )}
      <IconButton
        style={{height: 50, width: 50, backgroundColor: 'red'}}
        icon={iconos.IonicIcons.recargar}
        size={30}
        color={colores.textPrimary}
        onPress={Catalogos}
        iconType={'IonicIcon'}
      />
    </View>
  );
};
