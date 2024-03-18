import React, {useEffect, useState} from 'react';
import {
  DimensionValue,
  KeyboardTypeOptions,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {colores, iconos} from '../../theme/appTheme';
import {IconComponent} from './IconComponent';

interface Props {
  color?: string;
  defaultValue?: string;
  isEditable?: boolean;
  securetextentry?: boolean;
  keyboard?: KeyboardTypeOptions;
  maxLength?: number;
  width?: DimensionValue;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  placeholder?: string;
  getValue: (value: string) => void;
}

export const InputForm = ({
  placeholder,
  color = colores.plomoclaro,
  backgroundColor = colores.plomoclaro,
  defaultValue = '',
  getValue,
  isEditable = true,
  keyboard = 'default',
  maxLength = 100,
  securetextentry = false,
  width = '100%',
  style,
}: Props) => {
  const [value, setvalue] = useState(defaultValue);
  const [isPasswordSecure, setisPasswordSecure] = useState(securetextentry);
  useEffect(() => {
    getValue(value);
  }, [value]);

  return (
    <TextInput
      mode={'outlined'}
      theme={{
        colors: {
          background: colores.plomoclaro,
          onSurfaceVariant: colores.plomo,
        },
      }}
      style={{
        width,
        fontSize: 18,
        marginVertical: 5,
        ...(style as any),
      }}
      outlineStyle={{
        borderRadius: 10,
        //zIndex: -10,
        borderWidth: 0,
        backgroundColor,
      }}
      right={
        securetextentry && (
          <TextInput.Icon
            icon={() => (
              <IconComponent
                icon={
                  isPasswordSecure
                    ? iconos.IonicIcons.ojo
                    : iconos.IonicIcons.ojotachado
                }
                size={25}
                color={color}
                iconType={'IonicIcon'}></IconComponent>
            )}
            onPress={() =>
              setisPasswordSecure(!isPasswordSecure)
            }></TextInput.Icon>
        )
      }
      maxLength={maxLength}
      activeUnderlineColor={color}
      accessibilityIgnoresInvertColors
      outlineColor={color}
      underlineColor={color}
      selectionColor={color}
      activeOutlineColor={colores.azul}
      cursorColor={colores.plomo}
      label={placeholder}
      autoCapitalize={
        keyboard === 'email-address' || securetextentry ? 'none' : undefined
      }
      editable={isEditable}
      value={value}
      secureTextEntry={isPasswordSecure}
      onChangeText={setvalue}
      keyboardType={keyboard}
      underlineColorAndroid={color}></TextInput>
  );
};
