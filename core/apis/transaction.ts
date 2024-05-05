"use server"
// import {auth} from "@/auth";
// import {IUser} from "@/core/interfaces/user";

import {fetchData} from "@/lib/api";

interface queryParams {
    merchantId?: string;
    coreBankId?: string;
}

interface filterableTransactionsQueryParams {
    merchantId: string;
    search?: string;
    page: number;
    perPage: number;
    from?: Date;
    to?: Date;
    status?: string;
}

export async function getTransactions(query: queryParams, token: string) {
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const startOfNextYear = new Date(currentDate.getFullYear() + 1, 0, 1);

    const formatStartOfYear = startOfYear.toLocaleDateString('en-GB');
    const formatStartOfNextYear = startOfNextYear.toLocaleDateString('en-GB');

    const resData = await fetchData(`/transactions/all-transactions/with-filters?merchantId=${query.merchantId}&bankAccountId=${query.coreBankId}&csv=false&perPage=6&from=${formatStartOfYear}&to=${formatStartOfNextYear}`, 'GET', null, token, false);
    console.log(resData);
    // console.log(token);
    return resData.data;
}

export async function getFilterableTransactions(query: filterableTransactionsQueryParams, token: string) {
    const startPeriod = new Date(query.from ?? "");
    const endPeriod = new Date(query.to ?? "");

    const formatStartPeriod = startPeriod.toLocaleDateString('en-GB');
    const formatEndPeriod = endPeriod.toLocaleDateString('en-GB');

    const url = `/transactions/all-transactions/with-filters?merchantId=${query.merchantId}&search=${query.search ?? ""}&status=${query.status ?? ""}&page=${query.page}&perPage=${query.perPage}&from=${formatStartPeriod}&to=${formatEndPeriod}&csv=false`;
    console.log(url);

    const resData = await fetchData(url, 'GET', null, token, false);

    return resData;
}