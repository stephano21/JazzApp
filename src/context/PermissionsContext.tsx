import React, { createContext, useEffect, useState } from 'react';
import { AppState, Platform, Alert } from 'react-native';
import {
  check,
  openSettings,
  Permission,
  PERMISSIONS,
  PermissionStatus,
  requestMultiple,
} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
export interface PermissionsState {
  permissionAppStatus: PermissionStatus;
}

type PermissionsContextProps = {
  permissions: PermissionStatus;
  askPermission: () => void;
  checkPermission: () => void;
};

let AndroidPermissions: Permission[] = [
  PERMISSIONS.ANDROID.CAMERA,
  PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  // Agregado para permisos de notificación
];

const androidSDKVersion = Platform.OS === 'android' ? Platform.Version : 0;
if (androidSDKVersion <= 29) {
  AndroidPermissions.push(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
}
if (androidSDKVersion <= 32) {
  AndroidPermissions.push(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
}
if (androidSDKVersion >= 33) {
  AndroidPermissions.push(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);

}

let IosPermissions: Permission[] = [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE];

export const PermissionsContext = createContext({} as PermissionsContextProps);

export const PermissionsProvider = ({ children }: any) => {
  const [permissions, setPermissions] = useState<PermissionStatus>('unavailable');

  useEffect(() => {
    AppState.addEventListener('change', state => {
      if (state !== 'active') return;
      checkPermission();
    });
    // Crear el canal para notificaciones en Android
    notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Mensaje en primer plano:', remoteMessage);

      if (remoteMessage.notification) {
        // Mostrar una notificación local solo si remoteMessage.notification existe
        await notifee.displayNotification({
          title: remoteMessage.notification?.title || 'Título por defecto',
          body: remoteMessage.notification?.body || 'Mensaje por defecto',
          android: {
            channelId: 'default',
            importance: AndroidImportance.HIGH,
          },
        });
      } else if (remoteMessage.data) {
        // Maneja los casos en los que solo se envían datos
        console.log('Datos recibidos:', remoteMessage.data);
      }
    });

    return unsubscribe;
  }, []);

  // Manejador de mensajes en segundo plano
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Mensaje en segundo plano:', remoteMessage);
  });

  const askPermission = async () => {
    const permissions: Permission[] | undefined = Platform.select({
      ios: IosPermissions,
      android: AndroidPermissions,
    });

    const permissionStatuses = await requestMultiple(permissions!);

    const allGranted = Object.values(permissionStatuses).every(
      status => status === 'granted',
    );

    if (allGranted) {
      setPermissions('granted');
    } else {
      openSettings();
    }
  };

  const checkPermission = async () => {
    const permissions = Platform.select({
      ios: IosPermissions,
      android: AndroidPermissions,
    });

    const permissionStatuses = await Promise.all(
      permissions!.map(async permission => await check(permission)),
    );
    console.log(AndroidPermissions)
    console.log("hello:", permissionStatuses);
    if (permissionStatuses.every(status => status === 'granted')) {
      setPermissions('granted');
    } else {
      setPermissions('denied');
    }
  };

  return (
    <PermissionsContext.Provider
      value={{
        permissions,
        askPermission,
        checkPermission,
      }}>
      {children}
    </PermissionsContext.Provider>
  );
};
