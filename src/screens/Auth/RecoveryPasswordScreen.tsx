import React, {useState} from 'react';
import {BaseScreen} from '../../templates/BaseScreen';
import {Text, View} from 'react-native';
import {colores} from '../../theme/appTheme';
import {ButtonWithText} from '../../components/BaseComponents/ButtonWithText';
import {InputForm} from '../../components/BaseComponents/InputForm';

export const RecoveryPasswordScreen = () => {
  const [email, setemail] = useState('');
  return (
    <BaseScreen style={{justifyContent: 'center'}}>
      <Text
        style={{
          color: colores.inactive,
          fontSize: 20,
          marginBottom: '5%',
          maxWidth: 350,
          textAlign: 'justify',
        }}>
        Ingrese su correo electrónico, para poder generar una nueva contraseña
      </Text>
      <InputForm
        placeholder={'Correo Electrónico'}
        defaultValue={email}
        keyboard={'email-address'}
        getValue={value => setemail(value)}></InputForm>
      <View style={{height: 20, width: '100%'}}></View>
      <ButtonWithText
        anyfunction={() => {}}
        title={'RECUPERAR CUENTA'}></ButtonWithText>
    </BaseScreen>
  );
};
