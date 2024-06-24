export interface IBeneficiary {
    id?: string,
    reference?: string,
    firstName: string,
    lastName: string,
    email: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
    merchantId?: string,
    groupId?: string,
    infos: any[],
}