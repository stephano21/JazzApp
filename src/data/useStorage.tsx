import { IUser } from '../interfaces/AuthInterface';
import { useBaseStorage } from './useBaseStorage';

const keyStorage = {
  UserData: 'UserData',
};

export const useStorage = () => {
  const { SaveData, GetData, CheckData, DeleteData, RemoveData } =
    useBaseStorage();

  //#region UserData
  const SaveUserInfo = async (data: IUser) =>
    await SaveData(data, keyStorage.UserData);
  const GetUserInfo = async (): Promise<IUser> =>
    await GetData<IUser>(keyStorage.UserData);
  const ChecUserInfo = async (): Promise<boolean> =>
    await CheckData(keyStorage.UserData);
  //#endregion

  const RemoveAllData = async () => RemoveData([keyStorage.UserData]);

  return { SaveUserInfo, GetUserInfo, ChecUserInfo, RemoveAllData };
};
