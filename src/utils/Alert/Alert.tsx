import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useContext,
} from 'react';
import {AlertImageModal} from './AlertComponents/AlertImageModal';
import {AlertModal} from './AlertComponents/AlertModal';
import {AlertMultioptionsModal} from './AlertComponents/AlertMultioptionsModal';
import {AlertPromtModal} from './AlertComponents/AlertPromtModal';
import {AlertYesNoModal} from './AlertComponents/AlertYesNoModal';
import {AxiosError} from 'axios';
import {ApiErrorResponse} from '../../interfaces/BaseApiInterface';
import {CheckInternetContext} from '../../context/CheckInternetContext';

export type AlertTitleType =
  | 'Aviso'
  | 'Error'
  | 'Exito'
  | 'Informacion'
  | 'Cerrar Sesión'
  | 'Guardado'
  | 'Enviado';

type AlertType = 'default' | 'yesno' | 'promt' | 'image' | 'multioptions';

interface Options {
  title: AlertTitleType;
  message: string;
  placeholder?: string;
  imagePath?: string;
  OkFunction?: ((value?: string | undefined) => void) | (() => void);
  CancelFunction?: ((value?: string | undefined) => void) | (() => void);
  alertOptions?: {textOption: string; functionOption: () => void}[];
}
interface AlertData extends Options {
  type: AlertType;
  value: string;
}

type AlertProps = {
  show: (type: AlertType, options: Options) => void;
  showApiError: (
    error: AxiosError<ApiErrorResponse>,
    OkFunction?: () => void,
  ) => void;
};

const AlertComponent = forwardRef<AlertProps>((_props, ref) => {
  const {hasConnection} = useContext(CheckInternetContext);
  const [isVisible, setIsVisible] = useState(false);
  const [alertData, setAlertData] = useState<AlertData>({
    type: 'default',
    title: 'Aviso',
    message: '',
    placeholder: '',
    value: '',
    imagePath: '',
    OkFunction: () => {},
    CancelFunction: () => {},
    alertOptions: [],
  });

  const show = (type: AlertType, options: Options) => {
    setIsVisible(false);
    const {
      title,
      message,
      placeholder,
      imagePath,
      OkFunction,
      CancelFunction,
      alertOptions,
    } = options;
    setAlertData({
      type,
      title: title || 'Aviso',
      message: message || '',
      placeholder: placeholder || '',
      value: '',
      imagePath: imagePath || '',
      OkFunction: OkFunction || (() => {}),
      CancelFunction: CancelFunction || (() => {}),
      alertOptions: alertOptions ?? [],
    });
    setIsVisible(true);
  };

  const showApiError = (
    error: AxiosError<ApiErrorResponse>,
    OkFunction?: () => void,
  ) => {
    console.log(JSON.stringify(error, null, 3));
    console.log('status: ', error.response?.status);
    show('default', {
      title: 'Error',
      message: !hasConnection
        ? 'Verifique su conexión a Internet'
        : error.response?.status! >= 400 && error.response?.status! < 500
        ? typeof error.response?.data === 'string' &&
          !(error.response?.data as string).toString().match(/<html|<\?xml/)
          ? error.response.data // Si la respuesta es un string, úsalo directamente
          : typeof error.response?.data === 'object' &&
            typeof error.response.data.Message === 'string'
          ? error.response.data.Message // Si hay un error_description en el objeto JSON, úsalo
          : typeof error.response?.data.error_description === 'string'
          ? error.response.data.error_description // Agrega esta condición
          : 'Ocurrió un error en la consulta'
        : error.response?.status! >= 500
        ? 'Ocurrió un error en el servidor'
        : 'Ocurrió un error inesperado',
      OkFunction,
    });
  };

  const checkValue = () => {
    // Verifica si el valor está vacío
    if (alertData.value.length === 0) {
      // Muestra una alerta
      show('default', {
        title: 'Aviso',
        message: 'Debe llenar el campo requerido',
      });
    } else {
      // Ejecuta OkFunction con el valor
      if (typeof alertData.OkFunction === 'function') {
        alertData.OkFunction(alertData.value);
      }
      // Vacía el valor y oculta la alerta
      setAlertData(prevData => ({...prevData, value: ''}));
      hide();
    }
  };

  const hide = () => setIsVisible(false);

  useImperativeHandle(ref, () => ({
    show: (type, options) => show(type, options),
    showApiError: (error, OkFunction) => showApiError(error, OkFunction),
  }));

  return (
    <>
      {
        {
          default: (
            <AlertModal
              isVisible={isVisible}
              title={alertData.title}
              message={alertData.message}
              CloseFunction={() => {
                if (typeof alertData.OkFunction === 'function') {
                  alertData.OkFunction();
                }
                hide();
              }}
            />
          ),
          yesno: (
            <AlertYesNoModal
              isVisible={isVisible}
              title={alertData.title}
              message={alertData.message}
              CloseFunction={() => {
                if (typeof alertData.CancelFunction === 'function') {
                  alertData.CancelFunction();
                }
                hide();
              }}
              OkFunction={() => {
                if (typeof alertData.OkFunction === 'function') {
                  alertData.OkFunction();
                }
                hide();
              }}
            />
          ),
          promt: (
            <AlertPromtModal
              isVisible={isVisible}
              title={alertData.title}
              message={alertData.message}
              placeholder={alertData.placeholder}
              value={alertData.value}
              onChange={newValue =>
                setAlertData(prevData => ({...prevData, value: newValue}))
              }
              CloseFunction={() => hide()}
              OkFunction={() => checkValue()}
            />
          ),
          image: (
            <AlertImageModal
              isVisible={isVisible}
              CloseFunction={() => hide()}
              OkFunction={() => {
                if (typeof alertData.OkFunction === 'function') {
                  alertData.OkFunction();
                }
                hide();
              }}
              title={alertData.title}
              message={alertData.message}
              imagePath={alertData.imagePath ?? ''}
            />
          ),
          multioptions: (
            <AlertMultioptionsModal
              isVisible={isVisible}
              CloseFunction={() => hide()}
              title={alertData.title}
              message={alertData.message}
              options={alertData.alertOptions!}
            />
          ),
        }[alertData.type]
      }
    </>
  );
});

export const Alert = {
  show: (type: AlertType, options: Options) =>
    alertRef.current?.show(type, options) ?? {},
  showApiError: (
    error: AxiosError<ApiErrorResponse>,
    OkFunction?: () => void,
  ) => alertRef.current?.showApiError(error, OkFunction) ?? {},
};

const alertRef = useRef<AlertProps | null>(null);
export const AlertManager = () => (
  <AlertComponent ref={ref => (alertRef.current = ref)} />
);
