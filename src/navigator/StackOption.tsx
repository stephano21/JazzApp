import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {colores, styles} from '../theme/appTheme';
import {IconComponent} from '../components/BaseComponents/IconComponent';

interface Props {
  action: () => void;
  icono: string;
  tituloItem: string;
  isfocused?: boolean;
}

export const StackOption = ({
  action,
  icono,
  tituloItem,
  isfocused = false,
}: Props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: isfocused ? colores.primarioclaro : colores.blanco,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: colores.primarioclaro,
      }}
      onPress={() => action()}>
      <IconComponent
        icon={icono}
        size={20}
        color={colores.primario}
        style={{marginRight: 10}}
        iconType={'IonicIcon'}
      />
      <Text
        style={{
          ...styles.menuText,
          color: colores.primario,
          fontWeight: isfocused ? 'bold' : '300',
        }}>
        {tituloItem}
      </Text>
    </TouchableOpacity>
  );
};
