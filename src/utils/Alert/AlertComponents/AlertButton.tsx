import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {colores, styles} from '../../../theme/appTheme';

interface Props {
  anyFunction: ((obj?: any) => void) | ((obj?: any) => Promise<void>);
  color?: string;
  textOption?: string;
}

export const AlertButton = ({
  anyFunction,
  color = colores.success,
  textOption = '',
}: Props) => {
  const borderWidth = 0.3;
  const borderWidthColor = 'rgba(0,0,0,0.15)';
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => anyFunction()}
      style={{
        ...styles.centerItems,
        borderTopWidth: borderWidth,
        borderTopColor: borderWidthColor,
        borderRightWidth: borderWidth,
        borderRightColor: borderWidthColor,
        borderLeftWidth: borderWidth,
        borderLeftColor: borderWidthColor,
        height: 50,
        flexGrow: 1,
      }}>
      <Text
        style={{
          color,
          fontWeight: '300',
          fontSize: 18,
          textAlign: 'center',
        }}>
        {textOption}
      </Text>
    </TouchableOpacity>
  );
};
