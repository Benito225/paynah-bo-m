"use server";
export async function fetchData(url: string, method = 'GET', body: any = null, token: any = null, defaultApi: boolean = true, type: string = "json") {

    const headers: any = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    if (type == 'file-csv') {
        headers['Content-Type'] = `text/csv`;
    }

    const options: any = {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
        cache: 'no-store'
    };

    const endpoint = defaultApi ? process.env.BO_API_BASE_URL+url : process.env.BO_TRANS_API_BASE_URL+url;

    const response = await fetch(endpoint, options);

    if (type == 'file-csv') {
        return response;
    }

    return response.json();
}
