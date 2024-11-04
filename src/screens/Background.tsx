import React from 'react';
import {SafeAreaView, Text, useWindowDimensions, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {colores} from '../theme/appTheme';
import {VersionApp} from '../helpers/VersionApp';

interface Props {
  showVersion?: boolean;
  hasHeader?: boolean;
}

export const Background = ({showVersion = false, hasHeader = true}: Props) => {
  const {height, width} = useWindowDimensions();
  return (
    <View
      style={{
        height,
        width,
        position: 'absolute',
        zIndex: -10,
      }}>
      {showVersion && (
        <View
          style={{
            position: 'absolute',
            right: 10,
            bottom: 30,
            zIndex: 10,
          }}>
          <Text
            style={{
              color: colores.background,
              fontSize: 18,
              fontFamily: 'KlavikaBold',
            }}>
            Versión: {VersionApp}
          </Text>
        </View>
      )}
      <Svg
        height="30%"
        width="100%"
        viewBox={'0 0 400 50'}
        style={{position: 'absolute', bottom: 0}}>
        <Path
          fill={colores.primary}
          d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
        />
      </Svg>
    </View>
  );
};
