export interface IAccount {
    id?: string;
    reference?: string;
    coreBankId?: string;
    balance?: number;
    skaleetBalance?: number;
    balanceDayMinus1?: number;
    isMain?: boolean;
    skaleet_balance?: number;
}