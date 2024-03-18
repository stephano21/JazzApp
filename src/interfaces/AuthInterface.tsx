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
    Username: string;
    Auth: IToken;
    Role: string;
    Env: string;
}
export interface ILocation {
    latitude: number;
    longitude: number;
}