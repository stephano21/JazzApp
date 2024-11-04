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
          //backgroundColor: colores.background,
          borderColor: complete ? colores.success : colores.error,
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
          name={complete ? iconos.IonicIcons.visto : iconos.IonicIcons.equis}
          size={30}
          color={complete ? colores.success : colores.error}></Icon>
        <Text
          style={{
            ...styles.textBold,
            color: colores.inactive,
            fontSize: width * 0.035,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
          }}>
          {title}
        </Text>
        <Icon
          name={sectionVisible && enable ? iconos.IonicIcons.arriba : iconos.IonicIcons.abajo}
          size={25}
          color={colores.primary}></Icon>
      </TouchableOpacity>
      {sectionVisible && enable && (
        <View style={{...styles.centerItems, marginBottom: 15}}>
          {children}
        </View>
      )}
    </View>
  );
};
