import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ButtonWithText} from './ButtonWithText';
import {colores, styles, iconos} from '../../theme/appTheme';

interface Props {
  title: string;
  enable?: boolean;
  visible?: boolean;
  complete: boolean;
  children: JSX.Element | JSX.Element[];
}

export const Section = ({
  title,
  enable = true,
  visible = false,
  complete = false,
  children,
}: Props) => {
  const {width} = useWindowDimensions();
  const [sectionVisible, setsectionVisible] = useState(visible);
  useEffect(() => {
    setsectionVisible(visible);
  }, [visible]);
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setsectionVisible(!sectionVisible)}
        style={{
          backgroundColor: colores.blanco,
          borderColor: complete ? colores.verde : colores.rojo,
          borderWidth: 0.5,
          width: width * 0.9,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '2%',
          margin: 5,
          ...styles.sombra,
        }}>
        <Icon
          name={complete ? iconos.visto : iconos.equis}
          size={30}
          color={complete ? colores.verde : colores.rojo}></Icon>
        <Text
          style={{
            ...styles.textBold,
            color: colores.plomo,
            fontSize: width * 0.035,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
          }}>
          {title}
        </Text>
        <Icon
          name={sectionVisible && enable ? iconos.arriba : iconos.abajo}
          size={25}
          color={colores.primario}></Icon>
      </TouchableOpacity>
      {sectionVisible && enable && (
        <View style={{...styles.centerItems, marginBottom: 15}}>
          {children}
        </View>
      )}
    </View>
  );
};
