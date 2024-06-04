interface IProfile {
    id: string;
    name: string;
    code: string;
    isCorporate: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

export interface IUserAccount { 
    id: string;
    login: string;
    firstname: string;
    lastname: string;
    admin: string;
    retry: number;
    locked: boolean;
    deactivate: boolean;
    createdAt: string;
    updatedAt: string;
    profile: IProfile;
}