interface IUser {
    id: string;
    login: string;
    password: string;
    admin: boolean;
    firstname: string;
    lastname: string;
    retry: number;
    locked: boolean;
    deactivate: boolean;
    profileId: string;
    codeOTP: string;
    isFirstConnection: boolean;
    refreshToken: string;
    tokenExpireAt: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    authenticationCode: string;
    countryId: string;
}

export interface IMerchantUser { 
    id: string;
    merchantId: string;
    userId: string;
    service_id: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    user: IUser;
}