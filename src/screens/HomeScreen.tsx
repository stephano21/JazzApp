import React, { useContext, useEffect, useState } from 'react';
import { Text, Button, StyleSheet, View, useWindowDimensions, RefreshControl } from 'react-native';
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
import { Card } from '../components/BaseComponents/Card';

export const HomeScreen = () => {
  const [Task, setTask] = useState<ITask>({
    title: '',
    description: ''
  });
  const ResetForm = () => {
    setTask({
      id: 0,
      title: '',
      description: ''
    });
  };
  const { title, description, id, onChange } = useForm({
    id: Task.id,
    title: Task.title,
    description: Task.description,
  });
  const { width } = useWindowDimensions();
  const { showDocument } = useContext(DocumentViewContext);
  const { postRequest } = useRequest();
  const { GetTasks, AddTask,UpdateTask,DeleteTask } = useTasks();
  const [tasksList, setTasksList] = useState<ITask[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const pruebafuncion = () => {
    console.log('prueba de OkFunction sin parametro');
  };
  const pruebafuncionconvalue = (text: string) => {
    console.log('prueba de OkFunction con parametro: ', text);
  };
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    console.log('refreshing');
    setRefresh(true);
    loadData();
    setRefresh(false);
  };
  const ConfirmDelete = (data:ITask) => {
    Alert.show('yesno', {
      title: 'Aviso',
      message: `¿Esta seguro de eliminar ${data.title}?`,
      OkFunction: (DeleteTask(data?.id)),
    });
  };
  const CardList = (lecturas: ITask[]) => {
    return (
      <ScrollView style={{ width: "90%" }}
      refreshControl={<RefreshControl refreshing={refresh} onRefresh={handleRefresh} />}>
        {lecturas.map((item, index) => {
          return (
            <Card
              onLongPress={() => {
                loadData();
                ConfirmDelete(item) }}
              onPress={() => {
                setEdit(true)
                setTask(item);
                setIsModalVisible(true)
              }}
              key={index}
              title={item.title}
              description={item.description}
            />
          );
        }
        )}
      </ScrollView>
    )
  }
  const SendTask = async () => {

    let data: ITask = {
      id: Task.id,
      title: title,
      description: description
    }
    edit?UpdateTask(data): AddTask(data);
    setEdit(false)
    console.log(data);
    loadData();
    ResetForm();
    setIsModalVisible(false);
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

  return (
    <BaseScreen>
      <SearchInput
        placeholder={'Buscador de prueba'}
        catalog={tasksList}
        textCompare={item => [item.title, item.description]}
        result={items => console.log(items)}></SearchInput>

      {CardList(tasksList)}

      <ButtonWithText
        icon='add-outline'
        color='transparent'
        redondo={true}
        anyfunction={() => openModal()}>

      </ButtonWithText>
      <>
        {isModalVisible && (
          <BaseViewModal
            title={edit ? 'Edit task' : 'Add Task'}
            isVisible={isModalVisible}
            CloseFunction={() => {
              setEdit(false);
              setIsModalVisible(false);
            }}
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
              icon='rocket-outline'
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