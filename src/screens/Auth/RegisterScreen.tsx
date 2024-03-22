import React from 'react';
import { BaseScreen } from '../../templates/BaseScreen';
import { Text } from 'react-native';
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
    <BaseScreen isScroll={true} style={{ justifyContent: 'center' }}>
      <Text style={{ color: colores.plomo, fontSize: 22, marginBottom: '10%' }}>
        ¡Regístrese!
      </Text>
      <InputForm
        placeholder={'Nombres'}
        keyboard={'email-address'}
        color={colores.plomo}
        getValue={value => { }} />
      <InputForm
        color={colores.plomo}
        placeholder={'Apellidos'}
        securetextentry={true}
        getValue={value => { }} />

      <ButtonWithText
        color={colores.secundario}
        anyfunction={() => { }}
        title={'TOMAR FOTO DE PERFIL'}></ButtonWithText>
      <InputForm
        color={colores.plomo}
        placeholder={'Identificación'}
        securetextentry={true}
        getValue={value => { }}
      />

      <InputForm
        color={colores.plomo}
        placeholder={'Número de teléfono'}
        securetextentry={true}
        getValue={value => { }} />
      <InputForm
        color={colores.plomo}
        placeholder={'Email'}
        securetextentry={true}
        getValue={value => { }} />
      <InputForm
        color={colores.plomo}
        placeholder={'Contraseña'}
        securetextentry={true}
        getValue={value => { }} />
      <InputForm
        color={colores.plomo}
        placeholder={'Confirmar Contraseña'}
        securetextentry={true}
        getValue={value => { }} />
      <ButtonWithText
        anyfunction={() => { }}
        title={'REGISTRAR CUENTA'}></ButtonWithText>
        <TextButton
          title={'¿Ya tienes una cuenta? ¡Iniciar sesión!'}
          anyfunction={() =>
            navigation.dispatch(CommonActions.navigate('LoginScreen'))
          }></TextButton>
    </BaseScreen>
  );
};
