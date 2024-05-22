"use server"
// import {auth} from "@/auth";
// import {IUser} from "@/core/interfaces/user";

import {fetchData} from "@/lib/api";

export async function getCountries(token: string) {
    const resData = await fetchData(`/countries`, 'GET', null, token, true);
    console.log(resData);
    console.log(token);
    return resData.data;
}

export async function getCountryOperators(countryId: string, token: string) {
    const resData = await fetchData(`/countries/${countryId}/operators`, 'GET', null, token, true);
    if (!resData.success) {
        return [];
    }
    return resData.data;
}