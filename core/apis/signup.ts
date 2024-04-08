"use server";

import {fetchData} from "@/lib/api";

export async function getCountriesList() {
    const data = await fetchData('/countries');
    return data;
}
