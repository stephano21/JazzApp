import DeviceInfo from 'react-native-device-info';
import { check, PERMISSIONS } from 'react-native-permissions';
import NetInfo from "@react-native-community/netinfo";
import messaging from '@react-native-firebase/messaging';
export const VersionApp = `${DeviceInfo.getVersion()} (${DeviceInfo.getBuildNumber()})`;

export const getDeviceData = async () => {
    const uniqueId = (await DeviceInfo.getUniqueId()).toString();
    const token = await messaging().getToken(); // Suponiendo que ya tienes un token de notificación
    const brand = DeviceInfo.getBrand();
    const model = DeviceInfo.getModel();
    const systemName = DeviceInfo.getSystemName();
    const systemVersion = DeviceInfo.getSystemVersion();
    const batteryLevel = await DeviceInfo.getBatteryLevel();
    const isCharging = await DeviceInfo.isBatteryCharging();
    const isRooted = false;

    // Obtener permisos de ubicación y cámara
    const locationPermissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    const cameraPermissionStatus = await check(PERMISSIONS.ANDROID.CAMERA);
    const notificationPermissionStatus = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);


    // Obtener estado de la red
    const netInfo = await NetInfo.fetch();
    const connectionType = netInfo.type;
    const isConnected = netInfo.isConnected;

    return {
        uniqueId,
        token,
        brand,
        model,
        systemName,
        systemVersion,
        batteryLevel,
        isCharging,
        isRooted,
        locationPermissionStatus: locationPermissionStatus || 'denied',
        cameraPermissionStatus: cameraPermissionStatus || 'denied',
        notificationPermissionStatus: notificationPermissionStatus || 'denied',
        connectionType,
        isConnected
    };
};