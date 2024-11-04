import React from 'react';
import {Text, View, useWindowDimensions} from 'react-native';
import {colores, styles} from '../../theme/appTheme';

interface Props {
  property: string;
  info: string;
  textColor?: string;
  textSize?: number;
}

export const Info = ({
  property,
  info,
  textColor = colores.inactive,
  textSize = 0.03,
}: Props) => {
  const {width} = useWindowDimensions();
  return (
    <View style={{flexDirection: 'row', marginVertical: '0.5%'}}>
      <Text
        style={{
          ...styles.textData,
          fontSize: width * textSize,
          color: textColor,
        }}>
        {property}:{' '}
      </Text>
      <Text
        style={{
          ...styles.textBold,
          fontSize: width * textSize,
          color: textColor,
        }}>
        {info}
      </Text>
    </View>
  );
};
