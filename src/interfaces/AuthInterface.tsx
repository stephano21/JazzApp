import { IToken } from "./ApiInterfaces";

export interface ILogin {
    username: string;
    password: string;
    device: DeviceInfo;
}
export interface DeviceInfo {
    uniqueId: string;
    token: string;
    brand: string;
    model: string;
    systemName: string;
    systemVersion: string;
    batteryLevel: number;
    isCharging: boolean;
    isRooted: boolean;
    latitude: number;
    longitude: number;
    locationPermissionStatus: string;
    cameraPermissionStatus: string;
    notificationPermissionStatus: string;
    connectionType: string;
    isConnected: boolean;
}
export interface IRegister {
    Username: string;
    password: string;
    Email: string;
    FirstName: string;
    LastName: string;
}
export interface IUser {
    username: string;
    fullName?: string|null;
    auth: IToken;
    role: string;
    env: string;
}
export interface ILocation {
    latitude: number;
    longitude: number;
}

export interface IUserProfile {
    firstName: string;
    lastName: string;
    nickName?: string;
}

export interface IUserRegister {
    userName: string;
    email: string;
    role?: string;
    profile: IUserProfile;
    password: string;
}
