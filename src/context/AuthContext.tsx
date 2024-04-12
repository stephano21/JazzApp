import React, {createContext, useContext, useEffect, useState} from 'react';
import queryString from 'query-string';
import {ILogin} from '../interfaces/AuthInterface';
import {sleep} from '../helpers/sleep';
import {useStorage} from '../data/useStorage';
import {useRequest} from '../api/useRequest';
import {IUser} from '../interfaces/AuthInterface';
import {Alert} from '../utils/Alert/Alert';
import { Endpoints } from '../api/routes';

type AuthContextProps = {
  status: StatusTypes;
  //signUp: (obj: CreateUser, pass: string) => Promise<void>;
  signIn: (obj: ILogin) => Promise<void>;
  logOut: () => void;
  UserData: IUser;
};

type StatusTypes = 'checking' | 'authenticated' | 'notauthenticated';

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const {SaveUserInfo, GetUserInfo, ChecUserInfo, RemoveAllData} = useStorage();
  const {postRequest, postRequestToken} = useRequest();
  const [status, setstatus] = useState<StatusTypes>('checking');
  const [UserData, setUserData] = useState<IUser>({
    Username: '',
    auth: {
      access_Token: '',
      refresh_Token: '',
    },
    Role: '',
    Env: '',
  });

  useEffect(() => {
    checkToken();
  }, []);

  /**
   * Checks if there is a token in local storage and attempts to authenticate with it
   * @returns void
   */

  const checkToken = async (): Promise<void> => {
    await sleep(2);
    await ChecUserInfo().then(check =>
      check
        ? GetUserInfo().then(Data  => {
          console.log('Data',Data);
          setUserData(Data);
          setstatus('authenticated');
        })
        : setstatus('notauthenticated'),
      );
      console.log('Data',UserData);
  };

  /*   const checkVersionApp = async () => {
    Loader.show();
    await ApiRequest.get(ApiEndpoints.ValidarVersion, {
      params: {
        version: DeviceInfo.getVersion(),
      },
    })
      .then(({data}: AxiosResponse) => {})
      .catch(({response}: AxiosError<any>) => {
        ShowAlert('default', {
          title: 'Error',
          message:
            response === undefined
              ? 'Verifique su conexión a Internet'
              : response!.data.Message === undefined
              ? 'Ocurrio un error en la consulta'
              : response!.data.Message,
        });
        logOut();
      })
      .finally(() => {
        Loader.hide();
      });
  }; */

  const signIn = async ({username, password}: ILogin) => {
    setstatus('authenticated');
    if (username.length === 0 || password.length === 0) {
      // If email or password not exist
      Alert.show('default', {
        title: 'Error',
        message: 'Debe llenar los campos requeridos',
      });
      return;
    }
    const dataUsuario:ILogin = ({
      username,
      password,
    });
    await postRequest<IUser>(Endpoints.login,dataUsuario)
      .then(async Data => {
        await SaveUserInfo(Data); // Save token in asyncstorage
        setUserData(Data); // Set token in context
        setstatus('authenticated');
        console.log('loginnnnn',UserData);
      })
      .catch(() => {});
  };

  const logOut = async () => {
    await RemoveAllData();
    //closeConnection();
    setstatus('notauthenticated');
  };

  return (
    <AuthContext.Provider
      value={{
        status,
        UserData,
        signIn,
        logOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
