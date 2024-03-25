import React, { useContext } from 'react';
import { Text, Button, StyleSheet, View, useWindowDimensions } from 'react-native';
import { BaseScreen } from '../templates/BaseScreen';
import { DocumentViewContext } from '../context/DocumentViewContext';

import { useRequest } from '../api/useRequest';
import { Endpoints } from '../api/routes';
import { Selector } from '../components/BaseComponents/Selector';
import { SearchInput } from '../components/BaseComponents/SearchInput';
import { Alert } from '../utils/Alert/Alert';
import { sleep } from '../helpers/sleep';
import { Loader } from '../utils/Loader/Loader';
import { colores } from '../theme/appTheme';
import { ScrollView } from 'react-native-gesture-handler';
import { ButtonWithText } from '../components/BaseComponents/ButtonWithText';
import { List } from '../components/BaseComponents/List';
import { useTasks } from '../hooks/useTasks';

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
const tasksList = [
  {
    id: 1,
    title: "Comprar víveres",
    description: "Ir al supermercado y comprar los alimentos para la semana."
  },
  {
    id: 2,
    title: "Preparar presentación",
    description: "Preparar la presentación para la reunión del equipo el jueves."
  },
  {
    id: 3,
    title: "Llamar al cliente X",
    description: "Llamar al cliente X para discutir los detalles del proyecto."
  },
  {
    id: 4,
    title: "Enviar informe mensual",
    description: "Preparar y enviar el informe mensual al jefe de departamento."
  },
  {
    id: 5,
    title: "Hacer ejercicio",
    description: "Ir al gimnasio y hacer ejercicio durante una hora."
  },
  {
    id: 6,
    title: "Leer capítulo 5",
    description: "Leer el capítulo 5 del libro de historia para la clase de mañana."
  }
];
export const HomeScreen = () => {
  const { width } = useWindowDimensions();
  const { showDocument } = useContext(DocumentViewContext);
  const { postRequest } = useRequest();
  const {GetTasks} = useTasks();

  const pruebafuncion = () => {
    console.log('prueba de OkFunction sin parametro');
  };
  const pruebafuncionconvalue = (text: string) => {
    console.log('prueba de OkFunction con parametro: ', text);
  };
  const TodoList = (lectura: any) => {
    // Itera a través de las propiedades del objeto GlobalLecturas y muestra sus valores
    return (
      <View style={{ ...lecturasStyles.rutaContainer, width: width * 0.8 }}>
        <View key={lectura.id} style={{ flexDirection: 'column' }}>
          <View
            style={{
              alignItems: 'flex-end',
              width: width * 0.65,
            }}>
            <Text style={lecturasStyles.routeCod}>{lectura.title}</Text>
          </View>
          <Text style={lectura.description != "" ? lecturasStyles.route : lecturasStyles.routeEmpty}>{lectura.description != "" ? lectura.description : "No hay observación"}</Text>
        </View>
      </View>
    );
  };


  return (
    <BaseScreen>
      <SearchInput
        placeholder={'Buscador de prueba'}
        catalog={AvisoSelector}
        textCompare={item => [item.nombre, item.codigo, item.descripcion]}
        result={items => console.log(items)}></SearchInput>
      <ScrollView >
        <List
          data={tasksList}
          refreshFunction={() => { }}
          renderItem={TodoList}
          ListEmptyText="No hay lecturas por visualizar"
        />
      </ScrollView>
      {/* <Text >dfgdfgdf</Text>
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
 */}

    </BaseScreen>
  );
};
const lecturasStyles = StyleSheet.create({
  rutaContainer: {
    height: '90%',
    flex: 1,
    marginBottom: 10,
    backgroundColor: colores.rojoClaro,
    borderRadius: 10,
    
  },
  route: {
    fontSize: 16,
    marginBottom: 4,
    marginHorizontal: 5,
    marginLeft: 20,
    padding: 5,
    color: colores.negro,
  },
  routeEmpty: {
    fontSize: 11,
    marginBottom: 4,
    marginHorizontal: 5,
    marginLeft: 20,
    padding: 5,
    color: colores.negro,
    fontStyle: "italic",
  },
  routeCod: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: colores.negro,
    marginTop: 5,
  },
});