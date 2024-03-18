import React from 'react';
import {TouchableOpacity, useWindowDimensions} from 'react-native';
import {TextInput} from 'react-native-paper';
import {colores} from '../../theme/appTheme';

interface Props {
  value: string;
  placeholder?: string;
  onPress: (data?: string) => void;
  color?: string;
}

export const InputReadOnlyForm = ({
  value,
  onPress,
  color = colores.primario,
  placeholder = '',
}: Props) => {
  const {width} = useWindowDimensions();
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{width: width * 0.8, height: 50, marginVertical: 5}}
      onPress={() => onPress()}>
      <TextInput
        mode={'outlined'}
        editable={false}
        style={{
          flex: 1,
          color: colores.negro,
          fontWeight: 'bold',
          textAlign: 'center',
          justifyContent: 'center',
          fontSize: 16,
          backgroundColor: colores.blanco,
        }}
        contentStyle={{textAlign: 'center', justifyContent: 'center'}}
        label={placeholder}
        underlineColorAndroid={color}
        activeUnderlineColor={color}
        outlineColor={color}
        underlineColor={color}
        selectionColor={color}
        activeOutlineColor={color}
        placeholder={placeholder}
        placeholderTextColor={colores.plomo}
        value={value}></TextInput>
    </TouchableOpacity>
  );
};
