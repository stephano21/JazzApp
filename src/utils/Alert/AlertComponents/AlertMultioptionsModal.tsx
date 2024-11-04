import React from 'react';
import {View} from 'react-native';
import {AlertBaseModal, BaseAlertProps} from './AlertBaseModal';
import {colores} from '../../../theme/appTheme';
import {AlertButton} from './AlertButton';

interface Props extends BaseAlertProps {
  options: {textOption: string; functionOption: () => void}[];
}
export const AlertMultioptionsModal = ({
  CloseFunction,
  title = 'Aviso',
  message,
  isVisible = false,
  options,
}: Props) => {
  return (
    <AlertBaseModal
      title={title}
      message={message}
      isVisible={isVisible}
      CloseFunction={CloseFunction}>
      <View style={{width: '100%'}}>
        {options.map(({textOption, functionOption}, index) => (
          <AlertButton
            key={index}
            color={colores.primary}
            textOption={textOption}
            anyFunction={() => {
              functionOption();
              CloseFunction();
            }}></AlertButton>
        ))}
        <AlertButton
          color={colores.error}
          textOption={'Cancelar'}
          anyFunction={CloseFunction}></AlertButton>
      </View>
    </AlertBaseModal>
  );
};
