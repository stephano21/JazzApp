import React, { useState } from 'react';
import { BaseScreen } from '../templates/BaseScreen';
import { Text } from 'react-native-paper';
import { InputForm } from '../components/BaseComponents/InputForm';
import { colores } from '../theme/appTheme';
import { useForm } from '../hooks/useForm';
import { ButtonWithText } from '../components/BaseComponents/ButtonWithText';
interface Task {
    Title: string;
    Description: string;
}
export const TaskScreen = () => {
    const [Task, setTask] = useState<Task>({
        Title: '',
        Description: ''
    });
    const { Title, Description, onChange } = useForm({
        Title: Task.Title,
        Description: Task.Description,
    });
    return (
        <BaseScreen>
            <InputForm
                placeholder={'Title'}
                color={colores.plomo}
                defaultValue={Task.Title}
                getValue={value => onChange(value, 'Title')}></InputForm>
                <InputForm
                placeholder={'Description'}
                color={colores.plomo}
                defaultValue={Task.Description}
                getValue={value => onChange(value, 'Description')}></InputForm>
                <ButtonWithText 
                title='Add Task'
                width={'100%'} 
                anyfunction={()=>{}}></ButtonWithText>
        </BaseScreen>
    );
};