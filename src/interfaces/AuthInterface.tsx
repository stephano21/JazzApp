import { IToken } from "./ApiInterfaces";

export interface ILogin {
    username: string;
    password: string;
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
    fullName: string;
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
