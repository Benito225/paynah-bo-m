export interface IUser {
    id?: string;
    sub?: string;
    login?: string;
    firstname?: string;
    lastname?: string;
    isFirstConnection?: boolean;
    codeOTP?: string;
    merchantsIds?: [];
    accessToken?: string | undefined;
}