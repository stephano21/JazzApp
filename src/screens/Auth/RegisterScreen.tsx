import React, { useEffect, useState } from 'react';
import { BaseScreen } from '../../templates/BaseScreen';
import { Image, Text } from 'react-native';
import { colores } from '../../theme/appTheme';
import { useForm } from '../../hooks/useForm';
import { ButtonWithText } from '../../components/BaseComponents/ButtonWithText';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { InputForm } from '../../components/BaseComponents/InputForm';
import { TextButton } from '../../components/BaseComponents/TextButton';
import { IUserRegister } from '../../interfaces/AuthInterface';
import { useRequest } from '../../api/useRequest';
import { Endpoints } from '../../api/routes';
import { Alert } from '../../utils/Alert/Alert';

export const RegisterScreen = () => {
  const navigation = useNavigation();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { postRequest } = useRequest();
  const [userData, setUserData] = useState<IUserRegister>({
    userName: '',
    password: '',
    email: '',
    porfile: {
      lastName: '',
      firstName: '',
    }
  });
  const handleChange = (value: string, name: string) => {
    // Si el nombre de la propiedad contiene un punto (.), eso indica que es un campo anidado
    if (name.includes('.')) {
      // Divide el nombre de la propiedad para obtener el nombre del objeto y el nombre del campo
      const [objectName, fieldName]: string[] = name.split('.');
      // Actualiza el estado anidado utilizando una estructura de datos inmutable
      setUserData({
        ...userData,
        [objectName]: {
          ...userData[objectName],
          [fieldName]: value,
        },
      });
    } else {
      // Si no es un campo anidado, actualiza el estado normalmente
      setUserData({
        ...userData,
        [name]: value,
      });
    }
  };
  
  const handleChangePassword = (value:string) => {
    setPassword(value);
    checkButtonState(value, confirmPassword);
  };

  const handleChangeConfirmPassword = (value:string) => {
    setConfirmPassword(value);
    checkButtonState(password, value);
  };
  const checkButtonState = (password:string, confirmPassword:string) => {
    if (password === confirmPassword && password !== '' && confirmPassword !== '') {
      setIsButtonDisabled(false);
      setUserData({
        ...userData,
        ['password']: password,
      });

    } else {
      setIsButtonDisabled(true);
    }
  };
  const handleRegister = async () => { 
    postRequest(Endpoints.register, userData).then((response) => {
      if (response) {
        navigation.dispatch(CommonActions.navigate('LoginScreen'));
      }else{
        Alert.show('default', {
          title: 'Aviso',
          message: `No se pudo registar`,
        });
      }
    }
    );
    console.log(userData); 
  };
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
        defaultValue={userData.porfile.firstName}
        getValue={value => handleChange(value, 'porfile.firstName')} />
      <InputForm
        color={colores.plomo}
        placeholder={'Apellidos'}
        defaultValue={userData.porfile.lastName}
        getValue={value => { handleChange(value, 'porfile.lastName')}} />
      <InputForm
        color={colores.plomo}
        placeholder={'Nombre de usuario'}
        defaultValue={userData.userName}
        getValue={value => { handleChange(value, 'username')}} />
      <InputForm
        color={colores.plomo}
        keyboard={'email-address'}
        placeholder={'Email'}
        defaultValue={userData.email}
        getValue={value => { handleChange(value, 'email')}} />
      <InputForm
        color={colores.plomo}
        securetextentry={true}
        placeholder={'Contraseña'}
        defaultValue={password}
        getValue={value => { handleChangePassword(value)}} />
      <InputForm
        color={colores.plomo}
        securetextentry={true}
        placeholder={'Confirmar Contraseña'}
        defaultValue={confirmPassword}
        getValue={value => {  handleChangeConfirmPassword(value)}} />
      <ButtonWithText
        disabled={isButtonDisabled}
        anyfunction={() => { handleRegister()}}
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
