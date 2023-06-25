
export interface AuthenticateDTO{
        access: string;
    refresh: string;
}

export interface AuthenticateCheckDTO{
        section: AuthenticateSection;

}

export enum AuthenticateSection{
    USERNAME="USERNAME",
    PASSWORD="PASSWORD",
    OTP="OTP",
}

