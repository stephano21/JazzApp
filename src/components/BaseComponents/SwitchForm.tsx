import React, {useEffect, useState} from 'react';
import {Switch, View, useWindowDimensions} from 'react-native';
import {Text} from 'react-native-paper';
import {colores, styles} from '../../theme/appTheme';
import {BaseInputProps} from '../../interfaces/ProjInterfaces';

interface Props extends BaseInputProps<boolean> {}
export const SwitchForm = ({
  placeholder,
  defaultValue = false,
  getValue,
}: Props) => {
  const {width} = useWindowDimensions();
  const [value, setvalue] = useState(defaultValue);
  useEffect(() => {
    getValue(value);
  }, [value]);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
        width: width * 0.8,
        borderBottomWidth: 0.5,
        borderBottomColor: colores.primarioclaro,
      }}>
      <Text style={{...styles.textData}}>{placeholder}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{...styles.textData}}>No</Text>
        <Switch
          style={{marginHorizontal: 10}}
          trackColor={{false: '#767577', true: colores.secundario}}
          thumbColor={'#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setvalue(!value)}
          value={value as boolean}
        />
        <Text style={{...styles.textData}}>Si</Text>
      </View>
    </View>
  );
};
