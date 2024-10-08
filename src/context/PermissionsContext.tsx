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
  PERMISSIONS.ANDROID.POST_NOTIFICATIONS, // Agregado para permisos de notificación
];

const androidSDKVersion = Platform.OS === 'android' ? Platform.Version : 0;
if (androidSDKVersion <= 29) {
  AndroidPermissions.push(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
}
if (androidSDKVersion <= 32) {
  AndroidPermissions.push(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
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
    console.log(permissionStatuses);
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
