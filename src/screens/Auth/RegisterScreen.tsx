import React from 'react';
import { BaseScreen } from '../../templates/BaseScreen';
import { Image, Text } from 'react-native';
import { colores } from '../../theme/appTheme';
import { useForm } from '../../hooks/useForm';
import { ButtonWithText } from '../../components/BaseComponents/ButtonWithText';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { InputForm } from '../../components/BaseComponents/InputForm';
import { TextButton } from '../../components/BaseComponents/TextButton';

export const RegisterScreen = () => {
  const navigation = useNavigation();
  const {
    Nombres,
    Apellidos,
    Identificacion,
    Telefono,
    Email,
    Password,
    CheckPassword,
    onChange,
  } = useForm({
    Nombres: '',
    Apellidos: '',
    Identificacion: '',
    Telefono: '',
    Email: '',
    Password: '',
    CheckPassword: '',
  });
  return (
    <BaseScreen isScroll={true} alignItems="flex-end" style={{ justifyContent: 'flex-end' }}>
      <Image
        source={require('../../assets/logo.png')}
        style={{
          height: '20%',
          width: '80%',
          marginTop: '35%',
          marginBottom: '5%',
          resizeMode: 'contain',
          alignSelf: 'center',
        }}></Image>
      <InputForm
        placeholder={'Nombres'}
        color={colores.plomo}
        getValue={value => { }} />
      <InputForm
        color={colores.plomo}
        placeholder={'Apellidos'}
        
        getValue={value => { }} />
      
      <InputForm
        color={colores.plomo}
        keyboard={'email-address'}
        placeholder={'Email'}
        
        getValue={value => { }} />
      <InputForm
        color={colores.plomo}
        securetextentry={true}
        placeholder={'Contraseña'}
        getValue={value => { }} />
      <InputForm
        color={colores.plomo}
        securetextentry={true}
        placeholder={'Confirmar Contraseña'}
        
        getValue={value => { }} />
      <ButtonWithText
        anyfunction={() => { }}
        width={'100%'}
        title={'REGISTRAR CUENTA'}></ButtonWithText>
        <TextButton
          title={'¿Ya tienes una cuenta? ¡Iniciar sesión!'}
          anyfunction={() =>
            navigation.dispatch(CommonActions.navigate('LoginScreen'))
          }></TextButton>
    </BaseScreen>
  );
};
