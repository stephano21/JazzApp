import React from 'react';
import {View} from 'react-native';
import {colores, iconos} from '../../../theme/appTheme';
import {AlertBaseModal, BaseAlertProps} from './AlertBaseModal';
import {InputForm} from '../../../components/BaseComponents/InputForm';
import {AlertButton} from './AlertButton';

interface Props extends BaseAlertProps {
  OkFunction: () => void;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}
export const AlertPromtModal = ({
  CloseFunction,
  OkFunction,
  value,
  title,
  message,
  onChange,
  placeholder = 'Su informacion',
  isVisible = false,
}: Props) => {
  return (
    <AlertBaseModal
      title={title}
      message={message}
      isVisible={isVisible}
      CloseFunction={CloseFunction}>
      <InputForm
        style={{marginBottom: 20}}
        placeholder={placeholder}
        getValue={onChange}></InputForm>
      <View style={{alignSelf: 'flex-end', flexDirection: 'row'}}>
        <AlertButton
          textOption="Cancelar"
          color={colores.rojo}
          anyFunction={CloseFunction}></AlertButton>
        <AlertButton
          textOption="Aceptar"
          color={colores.azul}
          anyFunction={OkFunction}></AlertButton>
      </View>
    </AlertBaseModal>
  );
};
