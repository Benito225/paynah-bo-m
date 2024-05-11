export interface ITransaction {
    tId?: string;
    transactionId?: string;
    transaction_type?: any;
    createdAt?: string;
    date: string;
    description?: string;
    type?: string;
    amount: number;
    country?: string;
    status: string;
}