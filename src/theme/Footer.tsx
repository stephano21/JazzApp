import React, { useContext } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { checkEnviroment } from '../api/routes';
import { VersionApp } from '../helpers/VersionApp';
import { colores, iconos } from './appTheme';
import { AuthContext } from '../context/AuthContext';
import { IconComponent } from '../components/BaseComponents/IconComponent';
import { CheckInternetContext } from '../context/CheckInternetContext';
import { Info } from '../components/BaseComponents/Info';

export const Footer = () => {
  const { width } = useWindowDimensions();
  const { status, UserData } = useContext(AuthContext);
  const { hasConnection } = useContext(CheckInternetContext);
  return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: `${colores.primary}`,
          paddingHorizontal: '4.5%',
        }}>
        <IconComponent
          style={{ position: 'absolute', left: '1%', bottom: '10%' }}
          iconType={'IonicIcon'}
          size={width * 0.03}
          icon={iconos.IonicIcons.celular}
          color={hasConnection ? 'lightgreen' : 'red'}></IconComponent>
        {status === 'authenticated' && (<>
          <Info
            textSize={0.02}
            textColor={colores.textPrimary}
            property={'Ambiente'}
            info={checkEnviroment}></Info>
          <Info
            textSize={0.02}
            textColor={colores.textPrimary}
            property={'Usuario'}
            info={UserData?.username}></Info>
          <Info
            textSize={0.02}
            textColor={colores.textPrimary}
            property={'Rol'}
            info={UserData?.role}></Info>
        </>
        )}
        <Info
          textSize={0.02}
          textColor={colores.textPrimary}
          property={'Versión'}
          info={VersionApp}></Info>
      </View>
  );
};
