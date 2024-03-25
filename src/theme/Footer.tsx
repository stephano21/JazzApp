import React, {useContext} from 'react';
import {View, useWindowDimensions} from 'react-native';
import {checkEnviroment} from '../api/routes';
import {VersionApp} from '../helpers/VersionApp';
import {colores, iconos} from './appTheme';
import {AuthContext} from '../context/AuthContext';
import {IconComponent} from '../components/BaseComponents/IconComponent';
import {CheckInternetContext} from '../context/CheckInternetContext';
import {Info} from '../components/BaseComponents/Info';

export const Footer = () => {
  const {width} = useWindowDimensions();
  const {status} = useContext(AuthContext);
  const {hasConnection} = useContext(CheckInternetContext);
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: `${colores.negro}90`,
        paddingHorizontal: '4.5%',
      }}>
      <IconComponent
        style={{position: 'absolute', left: '1%', bottom: '10%'}}
        iconType={'IonicIcon'}
        size={width * 0.03}
        icon={iconos.IonicIcons.celular}
        color={hasConnection ? 'lightgreen' : 'red'}></IconComponent>
      <Info
        textSize={0.02}
        textColor={colores.blanco}
        property={'Ambiente'}
        info={checkEnviroment}></Info>
      {status === 'authenticated' && (
        <>
          <Info
            textSize={0.02}
            textColor={colores.blanco}
            property={'Usuario'}
            info={'acuenca'}></Info>
          <Info
            textSize={0.02}
            textColor={colores.blanco}
            property={'Patio'}
            info={'RFS 1'}></Info>
        </>
      )}
      <Info
        textSize={0.02}
        textColor={colores.blanco}
        property={'Versión'}
        info={VersionApp}></Info>
    </View>
  );
};
