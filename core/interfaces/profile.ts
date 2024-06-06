
interface IPrivilege {
    profileId: string;
    privilegeId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

export interface IProfile {
    id: string;
    name: string;
    code: string;
    isCorporate: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    privileges: IPrivilege[];
}