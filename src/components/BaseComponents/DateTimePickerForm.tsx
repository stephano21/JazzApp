import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {InputReadOnlyForm} from './InputReadOnlyForm';
import {DateTypes, formatDate} from '../../helpers/DateTimeFormat';
/* import {BaseInputProps} from '../../interfaces/ProjInterfaces';

interface Props extends BaseInputProps<unknown> {
  type: DateTypes;
} */

export const DateTimePickerForm = ({
  placeholder,
  defaultValue = '',
  getValue,
  type = 'date',
}: any) => {
  const [open, setOpen] = useState(false);
  const [value, setvalue] = useState(defaultValue);
  useEffect(() => {
    getValue(value);
  }, [value]);
  return (
    <>
      <InputReadOnlyForm
        placeholder={placeholder}
        value={formatDate(value.toString(), type)}
        onPress={() => setOpen(true)}
      />
      <DatePicker
        modal
        locale="es"
        confirmText="Confirmar"
        cancelText="Cancelar"
        title={'Seleccionar Fecha'}
        mode={type}
        open={open}
        date={value === '' ? new Date() : new Date(value)}
        onConfirm={date => {
          setOpen(false);
          setvalue(date.toString());
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
