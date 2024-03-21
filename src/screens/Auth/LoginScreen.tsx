import React, {useContext} from 'react';
import {View, Keyboard, Text, Image, useWindowDimensions} from 'react-native';
import {colores} from '../../theme/appTheme';
import {AuthContext} from '../../context/AuthContext';
import {useForm} from '../../hooks/useForm';
import {ButtonWithText} from '../../components/BaseComponents/ButtonWithText';
import {BaseScreen} from '../../templates/BaseScreen';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Background} from '../Background';
import DeviceInfo from 'react-native-device-info';
import {InputForm} from '../../components/BaseComponents/InputForm';
import {TextButton} from '../../components/BaseComponents/TextButton';

let user = '';
let pass = '';

if (__DEV__) {
  user = 'schang';
  pass = 'Test2020*+';
}

export const LoginScreen = () => {
  const {signIn} = useContext(AuthContext);
  const navigation = useNavigation();

  const {username, password, onChange} = useForm({
    username: user,
    password: pass,
  });

  const Login = async () => {
    Keyboard.dismiss();
    await signIn({username, password});
  };

  return (
    <BaseScreen>
      <Image
        source={require('../../assets/logo.png')}
        style={{
          height: '30%',
          width: '80%',
          resizeMode: 'contain',
          alignSelf: 'center',
        }}></Image>
      <Text
        style={{
          color: colores.plomo,
          marginBottom: '15%',
          fontSize: 30,
          textAlign: 'center',
        }}>
        Proyecto Base React Native
      </Text>
      <InputForm
        placeholder={'Usuario'}
        defaultValue={username}
        keyboard={'email-address'}
        getValue={value => onChange(value, 'username')}></InputForm>
      <InputForm
        placeholder={'Contraseña'}
        securetextentry={true}
        color={colores.plomo}
        defaultValue={password}
        getValue={value => onChange(value, 'password')}></InputForm>
      <ButtonWithText
        anyfunction={() => Login()}
        title={'INICIAR SESIÓN'}></ButtonWithText>
      <View
        style={{
          alignSelf: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <TextButton
          title={'¿No tienes cuenta? ¡Registrate!'}
          anyfunction={() =>
            navigation.dispatch(CommonActions.navigate('RegisterScreen'))
          }></TextButton>
        <TextButton
          title={'Recuperar cuenta'}
          anyfunction={() =>
            navigation.dispatch(
              CommonActions.navigate('RecoveryPasswordScreen'),
            )
          }></TextButton>
      </View>

      <Background></Background>
    </BaseScreen>
  );
};
