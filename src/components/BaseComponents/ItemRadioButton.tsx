import React, {useEffect, useState} from 'react';
import {Text, View, useWindowDimensions} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {colores, styles} from '../../theme/appTheme';
import {BaseInputProps} from '../../interfaces/ProjInterfaces';

interface Props extends BaseInputProps<boolean> {}

export const ItemRadioButton = ({
  defaultValue,
  getValue,
  placeholder,
}: Props) => {
  const {width} = useWindowDimensions();
  const [value, setVheck] = useState(defaultValue);
  useEffect(() => {
    getValue(value as boolean);
  }, [value]);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
        width: width * 0.75,
        borderBottomWidth: 0.5,
        borderBottomColor: colores.primaryLight,
      }}>
      <Text style={{...styles.textData}}>{placeholder}</Text>
      <RadioButton
        value={value ? 'checked' : 'uncheked'}
        color={colores.secondary}
        status={value ? 'checked' : 'unchecked'}
        onPress={() => {
          setVheck(!value);
        }}
      />
    </View>
  );
};
