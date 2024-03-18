import React, {useContext} from 'react';
import {Text, Button} from 'react-native';
import {BaseScreen} from '../Templates/BaseScreen';
import {DocumentViewContext} from '../context/DocumentViewContext';

import {useRequest} from '../api/useRequest';
import {Endpoints} from '../api/routes';
import {Selector} from '../components/BaseComponents/Selector';
import {SearchInput} from '../components/BaseComponents/SearchInput';
import {Alert} from '../utils/Alert/Alert';
import {sleep} from '../helpers/sleep';
import {Loader} from '../utils/Loader/Loader';

const AvisoSelector = [
  {
    id: 1,
    nombre: 'Aviso 1',
    codigo: '0123456',
    descripcion: 'Aviso primero',
  },
  {
    id: 2,
    nombre: 'Aviso 2',
    codigo: '05468974',
    descripcion: 'Aviso segundo',
  },
  {
    id: 3,
    nombre: 'Aviso 3',
    codigo: '0123456',
    descripcion: 'Aviso tercero',
  },

  {
    id: 4,
    nombre: 'Aviso 4',
    codigo: '05468974',
    descripcion: 'Aviso cuarto',
  },
  {
    id: 5,
    nombre: 'Aviso 5',
    codigo: '05468592',
    descripcion: 'Aviso quinto',
  },
];

export const HomeScreen = () => {
  const {showDocument} = useContext(DocumentViewContext);
  const {postRequest} = useRequest();

  const pruebafuncion = () => {
    console.log('prueba de OkFunction sin parametro');
  };
  const pruebafuncionconvalue = (text: string) => {
    console.log('prueba de OkFunction con parametro: ', text);
  };

  

  return (
    <BaseScreen>
      <Text>HomeScreen</Text>
      <Button
        title="Alerta"
        onPress={() =>
          Alert.show('default', {
            title: 'Aviso',
            message: 'Alerta normal',
          })
        }></Button>
      <Text>HomeScreen</Text>
      <Button
        title="Alerta ok y cancel"
        onPress={() =>
          Alert.show('yesno', {
            title: 'Aviso',
            message: 'Alerta  ok y cancel',
            OkFunction: pruebafuncion,
          })
        }></Button>
      <Text>HomeScreen</Text>
      <Button
        title="Alerta para llenar"
        onPress={() =>
          Alert.show('promt', {
            title: 'Aviso',
            message: 'Alerta para llenar',
            placeholder: 'Aviso de placeholder',
            OkFunction: value => pruebafuncionconvalue(value!),
          })
        }></Button>
      <Text>HomeScreen</Text>
      <Button
        title="Alerta Con imagen"
        onPress={() =>
          Alert.show('image', {
            title: 'Aviso',
            message: 'Alerta con imagen',
            imagePath:
              'https://mooncargo.com.ec/wp-content/uploads/2020/11/transporte-de-carga-pesada.jpg',
          })
        }></Button>
      <Text>HomeScreen</Text>
      <Button
        title="Alerta Con opciones multiples"
        onPress={() =>
          Alert.show('multioptions', {
            title: 'Aviso',
            message: 'Alerta con multiples opciones',
            alertOptions: [
              {
                textOption: 'opcion 1',
                functionOption: () => console.log('Opcion 1'),
              },
              {
                textOption: 'opcion 2',
                functionOption: () => console.log('Opcion 2'),
              },
              {
                textOption: 'opcion 3',
                functionOption: () => console.log('Opcion 3'),
              },
            ],
          })
        }></Button>
      <Text>HomeScreen</Text>
      <Text>HomeScreen</Text>
      <Button
        title="Mostrar Pdf"
        onPress={() =>
          showDocument(
            `Guía066-541212125-121456123`,
            'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          )
        }></Button>
      <Text>HomeScreen</Text>
      <Button
        title="Enviar imagenes Humo en base 64"
        ></Button>
      <Text>HomeScreen</Text>
      <Selector
        catalog={AvisoSelector}
        selectedItem={item => {}}
        placeholder={'Selecciona un Item'}
        textItem={({nombre}) => nombre}></Selector>

      <SearchInput
        placeholder={'Buscador de prueba'}
        catalog={AvisoSelector}
        textCompare={item => [item.nombre, item.codigo, item.descripcion]}
        result={items => console.log(items)}></SearchInput>
    </BaseScreen>
  );
};
