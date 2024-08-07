import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colores, styles } from '../../theme/appTheme';
import { RadioButton } from 'react-native-paper';

interface Props {
  anyfunction: (() => void) | (() => Promise<void>);
  title?: string;
  color?: string;
  colorTexto?: string;
  icon?: string;
  width?: number | string;
  bagraundIcon?: string;
  tamañoIcon?: number;
  redondo?: boolean;
  disabled?: boolean;
}

export const ButtonWithText = ({
  anyfunction,
  title,
  disabled = false,
  color = colores.azul,
  colorTexto = colores.blanco,
  icon = '',
  width = 250,
  tamañoIcon = 25,
  bagraundIcon = colores.azul,
  redondo = false,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={disabled?1:0.9}
      onPress={disabled?()=>{}:anyfunction}
      style={{
        marginVertical: 14,
        ...styles.centerItems,
        //...styles.sombra,
        backgroundColor: disabled?colores.plomo:color,
        borderRadius: 10,
        alignSelf: 'center',
        flexDirection: 'row',
        width,
        
      }}>
      {icon.length > 0 && (
        <View
        style={{
          padding: 4,
          width: '25%',
          ...styles.centerItems,
          borderRadius: redondo ? 40 : 0,
          backgroundColor: bagraundIcon,
          
        }}>

          <Icon name={icon} size={tamañoIcon} color={colorTexto}></Icon>
        </View>
      )}
      {title && (
        <Text
          style={{ ...styles.textButton, color: colorTexto, textAlign: 'center' }}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
