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
interface Task {
    Title: string;
    Description: string;
}
export const TaskScreen = () => {
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
    const { GetTasks, AddTask, UpdateTask, DeleteTask } = useTasks();
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
    const handleDelete = async (id: number | undefined) => {
        if (id === undefined) return "No se puede eliminar";
        await DeleteTask(id);
        loadData();
    }
    const ConfirmDelete = (data: ITask) => {
        Alert.show('yesno', {
            title: 'Aviso',
            message: `¿Esta seguro de eliminar ${data.title}?`,
            OkFunction: (value: string | number | undefined) => handleDelete(data.id),
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
                                ConfirmDelete(item)
                            }}
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
    const handleChange = (value: string, name: string) => {
        setTask({
            ...Task,
            [name]: value,
        });
    };
    const SendTask = async () => {

        edit ? UpdateTask(Task) : AddTask(Task);
        setEdit(false)
        console.log(Task);
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
            {/*  <SearchInput
        placeholder={'Buscador de prueba'}
        catalog={tasksList}
        textCompare={item => [item.title, item.description]}
        result={items => console.log(items)}></SearchInput> */}

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

                    >

                        <InputForm
                            placeholder={'Title'}
                            color={colores.inactive}
                            defaultValue={Task.title}
                            getValue={value => handleChange(value, 'title')}></InputForm>
                        <InputForm
                            placeholder={'Description'}
                            color={colores.inactive}
                            defaultValue={Task.description}
                            getValue={value => handleChange(value, 'description')}></InputForm>
                        <ButtonWithText
                            title={edit ? 'Update Task' : 'Add Task'}
                            width={'100%'}
                            redondo
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
        backgroundColor: colores.accent,
        borderRadius: 10,

    },
    route: {
        fontSize: 16,
        marginBottom: 4,
        marginHorizontal: 5,
        marginLeft: 20,
        padding: 5,
        color: colores.black,
    },
    routeEmpty: {
        fontSize: 11,
        marginBottom: 4,
        marginHorizontal: 5,
        marginLeft: 20,
        padding: 5,
        color: colores.black,
        fontStyle: "italic",
    },
    routeCod: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
        color: colores.black,
        marginTop: 5,
    },
});