import { ITask } from "../interfaces/TaskInterfaces";
import { useRequest } from '../api/useRequest';
import { Endpoints } from "../api/routes";
import { useState } from "react";

export const useTasks = () => {
    const { postRequest, getRequest,putRequest, deleteRequest } = useRequest();
    const [task, setTask] = useState<ITask[]>([]);
    const GetTasks = async (): Promise<ITask[]> => {
        return await getRequest<ITask[]>(Endpoints.Task).then(
            async TodoList => {
                setTask(TodoList);
                return TodoList; // Devolvemos el valor y  se usa inmediatamente.
            },
        );
    };
    const AddTask = async (SingleTask: ITask): Promise<ITask> => {
        return await postRequest<ITask>(Endpoints.Task, SingleTask).then(
            async TodoList => {
                setTask([...task, TodoList]);
                return TodoList; // Devolvemos el valor y  se usa inmediatamente.
            },
        );
    };
    const DeleteTask = async (id: number): Promise<ITask> => {
        return await deleteRequest<ITask>(Endpoints.Task + `/${id}`).then(
            async TodoList => {
                setTask([...task, TodoList]);
                return TodoList; // Devolvemos el valor y  se usa inmediatamente.
            },
        );
    }
    const UpdateTask = async (SingleTask: ITask): Promise<ITask> => {
        return await putRequest<ITask>(Endpoints.Task, SingleTask).then(
            async TodoList => {
                setTask([...task, TodoList]);
                return TodoList; // Devolvemos el valor y  se usa inmediatamente.
            },
        );
    }
    return {
        GetTasks,
        AddTask,
        DeleteTask,
        UpdateTask,
        task,
    }
}