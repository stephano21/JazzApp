import { ITask } from "../interfaces/TaskInterfaces";
import { useRequest } from '../api/useRequest';
import { Endpoints } from "../api/routes";
import { useState } from "react";

export const useTasks = () => {
    const { postRequest, getRequest } = useRequest();
    const [task, setTask] = useState<ITask[]>([]);
    const GetTasks = async (): Promise<ITask[]> => {
        return await getRequest<ITask[]>(Endpoints.Task).then(
            async lotes => {
                setTask(lotes);
                return lotes; // Devolvemos el valor y  se usa inmediatamente.
            },
        );
    };
    return {
        GetTasks,
        task,
    }
}