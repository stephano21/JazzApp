import React, {useEffect, useState} from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDebouncedValue} from '../../hooks/useDebouncedValue';
import {iconos} from '../../theme/appTheme';
import {InputForm} from './InputForm';
import {IconComponent} from './IconComponent';

export interface SearchInputProps<T extends unknown> {
  placeholder: string;
  catalog: T[];
  textCompare: (item: T) => string[];
  result: (filteredItems: T[]) => void;
  style?: StyleProp<ViewStyle>;
}

export const SearchInput = <T extends unknown>({
  placeholder,
  catalog,
  textCompare,
  result,
  style,
}: SearchInputProps<T>) => {
  const [textValue, setTextValue] = useState('');
  const deboncedValue = useDebouncedValue(textValue);
  const filterItems = () => {
    if (deboncedValue.length < 3) {
      return result(catalog);
    }
    result(
      catalog.filter(item =>
        deboncedValue
          .trim()
          .toLowerCase()
          .split(/\s+/) // Divide la consulta en palabras clave
          .every(keyword =>
            textCompare(item).some(t =>
              t.trim().toLowerCase().includes(keyword),
            ),
          ),
      ),
    );
  };

  useEffect(() => {
    filterItems();
  }, [deboncedValue, catalog]);

  return (
    <View
      style={{
        width: '100%',
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...(style as any),
      }}>
      <InputForm
        width={'90%'}
        placeholder={placeholder}
        getValue={setTextValue}
      />
      <IconComponent
        icon={iconos.IonicIcons.lupa}
        iconType="IonicIcon"
        color="grey"
        size={30}
      />
    </View>
  );
};
