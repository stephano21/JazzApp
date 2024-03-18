import React, {useEffect, useRef} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles, iconos, colores} from '../../theme/appTheme';
import {Text, View, useWindowDimensions} from 'react-native';

interface Props<T extends unknown> {
  catalog: T[];
  selectedItem: (itemSelected: T) => void;
  placeholder: string;
  textItem: (itemSelected: T) => string;
  reset?: boolean;
  isRow?: boolean;
}

export const Selector = <T extends unknown>({
  catalog,
  selectedItem,
  placeholder,
  textItem,
  reset = false,
  isRow = false,
}: Props<T>) => {
  const {width} = useWindowDimensions();
  const selectorRef = useRef<SelectDropdown>();

  useEffect(() => {
    selectorRef.current?.reset();
  }, [reset]);
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        flexDirection: isRow ? 'row' : undefined,
        justifyContent: isRow ? 'space-between' : undefined,
      }}>
      <Text
        style={{
          ...styles.textData,
          maxWidth: isRow ? width * 0.4 : undefined,
        }}>
        {placeholder}
      </Text>
      <SelectDropdown
        ref={selectorref => (selectorRef.current = selectorref!)}
        data={catalog}
        onSelect={(item: T) => {
          selectedItem(item);
        }}
        onChangeSearchInputText={value => {}}
        defaultButtonText={'Seleccionar'}
        buttonStyle={{
          width: isRow ? '50%' : '80%',
          ...styles.sombra,
          ...styles.selector,
          borderRadius: 10,
        }}
        dropdownStyle={{...styles.sombra}}
        renderDropdownIcon={() => (
          <Icon
            name={iconos.IonicIcons.abajo}
            size={20}
            color={colores.darkTransparent}></Icon>
        )}
        buttonTextAfterSelection={(selectedItem: T, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return textItem(selectedItem);
        }}
        rowTextForSelection={(item: T, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return textItem(item);
        }}
      />
    </View>
  );
};
