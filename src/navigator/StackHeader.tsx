import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {colores, iconos, styles} from '../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import appinfo from '../../package.json';
import {useNavigation} from '@react-navigation/native';
import {IconComponent} from '../components/BaseComponents/IconComponent';
import {IconButton} from '../components/BaseComponents/IconButton';

interface Props {
  title: string;
}

export const StackHeader = ({title}: Props) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        height: 50,
        width: '100%',
        backgroundColor: colores.primario,
        ...styles.centerItems,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <IconButton
        size={30}
        color={colores.blanco}
        onPress={navigation.goBack}
        iconType={'IonicIcon'}
        icon={iconos.IonicIcons.atras}
      />
      <Text style={{ fontSize: 18, color:colores.blanco, fontWeight:"bold"}}>{title}</Text>
      <View style={{height: 50, width: 50}}></View>
    </View>
  );
};
