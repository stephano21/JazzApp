import React from 'react';
import {Text, View} from 'react-native';
import {colores, iconos, styles} from '../theme/appTheme';
import {useNavigation} from '@react-navigation/native';
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
        backgroundColor: colores.primary,
        ...styles.centerItems,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <IconButton
        size={30}
        color={colores.textPrimary}
        onPress={navigation.goBack}
        iconType={'IonicIcon'}
        icon={iconos.IonicIcons.atras}
      />
      <Text style={{ fontSize: 18, color:colores.textPrimary, fontWeight:"bold"}}>{title}</Text>
      <View style={{height: 50, width: 50}}></View>
    </View>
  );
};
