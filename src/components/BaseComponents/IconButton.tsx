import React from 'react';
import {IconComponent, IconProps} from './IconComponent';
import {TouchableOpacity, useWindowDimensions} from 'react-native';
import {colores, styles} from '../../theme/appTheme';

interface Props extends IconProps {
  onPress: () => void;
}

export const IconButton = ({iconType, icon, color, size, onPress}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        height: 50,
        width: 50,
        ...styles.centerItems,
        ...(styles as any),
      }}>
      <IconComponent
        iconType={iconType}
        icon={icon}
        size={size}
        color={color}></IconComponent>
    </TouchableOpacity>
  );
};
