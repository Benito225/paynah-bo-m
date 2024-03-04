"use server";
export async function fetchData(url: string, method = 'GET', body: any = null, token: any = null) {

    const headers: any = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const options: any = {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
        cache: 'no-store'
    };

    const endpoint = process.env.BO_API_BASE_URL+url;

    const response = await fetch(endpoint, options);

    return response.json();
}
