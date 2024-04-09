import React, { useContext, useEffect, useState } from 'react';
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
import { ITask } from '../interfaces/TaskInterfaces';
import { BaseModal } from '../templates/BaseModal';
import { InputForm } from '../components/BaseComponents/InputForm';
import { useForm } from '../hooks/useForm';
import { BaseViewModal } from '../templates/BaseViewModal';

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
/*  */

export const HomeScreen = () => {
  const [Task, setTask] = useState<ITask>({
    title: '',
    description: ''
  });
  const ResetForm = () => {
    setTask({
      title: '',
      description: ''
    });
  };
  const { title, description, onChange } = useForm({
    
    title: Task.title,
    description: Task.description,
  });
  const { width } = useWindowDimensions();
  const { showDocument } = useContext(DocumentViewContext);
  const { postRequest } = useRequest();
  const { GetTasks,AddTask } = useTasks();
  const [tasksList, setTasksList] = useState<ITask[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const pruebafuncion = () => {
    console.log('prueba de OkFunction sin parametro');
  };
  const pruebafuncionconvalue = (text: string) => {
    console.log('prueba de OkFunction con parametro: ', text);
  };
  const TodoList = (lectura: ITask) => {
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
  const SendTask = async () => {
    setTask({
      title: title,
      description: description
    })
    console.log(Task);
    AddTask(Task);
    loadData();
    ResetForm();
  }
  const loadData = async () => {
    setTasksList(await GetTasks());

  };
  useEffect(() => {
    loadData();
  }, []);
  const openModal = () => {
    setIsModalVisible(true);
    console.log("Modal abierto")

  }
  function HandleChange(value: string, arg1: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <BaseScreen>
      <SearchInput
        placeholder={'Buscador de prueba'}
        catalog={AvisoSelector}
        textCompare={item => [item.nombre, item.codigo, item.descripcion]}
        result={items => console.log(items)}></SearchInput>

      <List
        data={tasksList}
        refreshFunction={() => loadData()}
        renderItem={TodoList}
        ListEmptyText="You do not have any tasks yet."
      />
      <ButtonWithText
        icon='add-outline'
        anyfunction={() => openModal()}>

      </ButtonWithText>
      <>
        {isModalVisible && (
          <BaseViewModal

            isVisible={isModalVisible}
            CloseFunction={() => setIsModalVisible(false)}
            butons={
              <ButtonWithText
                icon='rocket-outline'
                color={colores.negro}
                bagraundIcon='transparent'
                title='Add Task'
                width={'30%'}
                anyfunction={() => openModal()}>

              </ButtonWithText>}
          >

            <InputForm
              placeholder={'Title'}
              color={colores.plomo}
              defaultValue={Task.title}
              getValue={value => onChange(value, 'title')}></InputForm>
            <InputForm
              placeholder={'Description'}
              color={colores.plomo}
              defaultValue={Task.description}
              getValue={value => onChange(value, 'description')}></InputForm>
            <ButtonWithText
              title='Add Task'
              width={'100%'}
              anyfunction={() => SendTask()}></ButtonWithText>
          </BaseViewModal>
        )}
      </>
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