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
        height: 50,
        width: '100%',
        backgroundColor: colores.blanco,
        ...styles.centerItems,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <IconButton
        style={{height: 50, width: 50, backgroundColor: 'red'}}
        icon={iconos.IonicIcons.menu}
        size={30}
        color={colores.primario}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        iconType={'IonicIcon'}
      />
      {title.length === 0 ? (
        <Image
          source={require('../assets/banner.png')}
          style={{
            height: '100%',
            width: '50%',
            resizeMode: 'contain',
            alignSelf: 'center',
          }}></Image>
      ) : (
        <Text style={{...styles.textTitle, color: colores.primario}}>
          {title}
        </Text>
      )}
      <IconButton
        style={{height: 50, width: 50, backgroundColor: 'red'}}
        icon={iconos.IonicIcons.recargar}
        size={30}
        color={colores.primario}
        onPress={Catalogos}
        iconType={'IonicIcon'}
      />
    </View>
  );
};
