import { useContext } from 'react';
import { Alert } from '../utils/Alert/Alert';
import { Loader } from '../utils/Loader/Loader';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ApiErrorResponse } from '../interfaces/ApiInterfaces';
import { AuthContext } from '../context/AuthContext';
import { Endpoints } from './routes';

export const useRequest = () => {
  //#region AxiosConfig

  const { UserData } = useContext(AuthContext);
  // Create an axios instance for the token endpoint
  const ApiTokenRequest = axios.create({
    baseURL: Endpoints.BaseURL +Endpoints.BaseApi+ Endpoints.login,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  // Create an axios instance for the other endpoints
  const ApiRequest = axios.create({
    baseURL: Endpoints.BaseURL + Endpoints.BaseApi,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${UserData?.auth?.access_Token ?? ''}`,
    },
  });
  const ApiPostFileRequest = axios.create({
    baseURL: Endpoints.BaseURL,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer  ${UserData?.auth?.access_Token ?? ''}`,
      otherHeader: 'foo',
    },
  });

  //#endregion

  //#region RequestConfig

  const getRequest = async <T extends unknown>(
    endpoint: string,
    params?: object,
  ): Promise<T> => {
    Loader.show();
    console.log("Token???",UserData?.auth?.access_Token);

    return await ApiRequest
      .get(endpoint, { params })
      .then(({ data }: AxiosResponse<T>) => data)
      .catch((error: AxiosError<ApiErrorResponse>) => {
        Alert.showApiError(error);
        throw error;
      })
      .finally(() => {
        Loader.hide();
      });
  };

  const postRequest = async <T extends unknown>(
    endpoint: string,
    data?: object,
    params?: object,
  ): Promise<T> => {
    Loader.show();
    console.log("Token???",UserData?.auth?.access_Token);
    return await ApiRequest.post(endpoint, data, { params })
      .then(({ data }: AxiosResponse<T>) => data)
      .catch((error: AxiosError<ApiErrorResponse>) => {
        Alert.showApiError(error);
        throw error;
      })
      .finally(() => {
        Loader.hide();
      });
  };

  const putRequest = async <T extends unknown>(
    endpoint: string,
    data?: object,
    params?: object,
  ): Promise<T> => {
    Loader.show();
    console.log("Token???",UserData?.auth?.access_Token);
    return await ApiRequest.put(endpoint, data, { params })
      .then(({ data }: AxiosResponse<T>) => data)
      .catch((error: AxiosError<ApiErrorResponse>) => {
        Alert.showApiError(error);
        throw error;
      })
      .finally(() => {
        Loader.hide();
      });
  };
  const deleteRequest = async <T extends unknown>(
    endpoint: string,
    data?: object,
    params?: object,
  ): Promise<T> => {
    Loader.show();
    console.log("Token???",UserData?.auth?.access_Token);
    return await ApiRequest.delete(endpoint, { params })
      .then(({ data }: AxiosResponse<T>) => data)
      .catch((error: AxiosError<ApiErrorResponse>) => {
        Alert.showApiError(error);
        throw error;
      })
      .finally(() => {
        Loader.hide();
      });
  };

  const postRequestToken = async <T extends unknown>(
    data: string,
  ): Promise<T> => {
    Loader.show();
    return await ApiTokenRequest.request({
      data,
    })
      .then(({ data }: AxiosResponse<T>) => data)
      .catch((error: AxiosError<ApiErrorResponse>) => {
        Alert.showApiError(error);
        console.log(JSON.stringify(error, null, 3));
        throw error;
      })
      .finally(() => {
        Loader.hide();
      });
  };

  const postFileRequest = async <T extends unknown>(
    endpoint: string,
    data?: object,
    params?: object,
  ): Promise<T> => {
    Loader.show();
    return await ApiPostFileRequest.post(endpoint, data, { params })
      .then(({ data }: AxiosResponse<T>) => data)
      .catch((error: AxiosError<ApiErrorResponse>) => {
        console.error(JSON.stringify(error, null, 3));
        Alert.showApiError(error);
        throw error;
      })
      .finally(() => {
        Loader.hide();
      });
  };

  //#endregion

  return { getRequest, postRequestToken, postRequest, postFileRequest, putRequest,deleteRequest };
};
