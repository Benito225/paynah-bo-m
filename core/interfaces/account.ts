export interface IAccount {
    id: string;
    reference: string;
    coreBankId: string;
    bankAccountId: string;
    balance: number;
    name: string;
    balanceDayMinus1: number;
    isMain: boolean;
    skaleet_balance: number;
}