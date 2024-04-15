export interface IUser {
    id?: string;
    sub?: string;
    login?: string;
    firstname?: string;
    lastname?: string;
    country?: string;
    isFirstConnection?: boolean;
    codeOTP?: string;
    merchantsIds?: [];
    accessToken?: string | undefined;
    refreshToken?: string | undefined;
}