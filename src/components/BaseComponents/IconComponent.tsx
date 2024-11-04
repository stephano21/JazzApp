import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colores} from '../../theme/appTheme';
import {StyleProp, ViewStyle} from 'react-native';

export type IconType =
  | 'IonicIcon'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'MaterialCommunityIcons'
  | 'Feather';

export interface IconProps {
  iconType: IconType;
  icon: string;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const iconLibraries = {
  IonicIcon,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  Feather,
};

export const IconComponent = ({
  iconType,
  icon,
  size = 20,
  color = colores.primary,
  style,
}: IconProps) => {
  const IconLibrary = iconLibraries[iconType];

  return (
    IconLibrary && (
      <IconLibrary
        style={{...(style as any)}}
        name={icon}
        color={color}
        size={size}
      />
    )
  );
};
