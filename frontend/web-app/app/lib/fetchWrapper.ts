import {auth} from "@/auth"

// const baseUrl = `${process.env.NEXT_PUBLIC_GATEWAY_BASE_URL}/`;
const baseUrl = `http://gateway:8080/`;


async function get(url: string) {

    const headers = await getHeaders();
    const requestOptions = {
        method: 'GET',
        headers: headers,
    }
    const response = await fetch(baseUrl + url, requestOptions)
    return handleResponse(response)
}

async function put(url: string, body: unknown) {
    const requestOptions = {
        method: 'PUT',
        headers: await getHeaders(),
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + url, requestOptions)
    return handleResponse(response)
}

async function post(url: string, body: unknown) {
    const requestOptions = {
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify(body)
    }
    console.log("this is post request" + baseUrl + url)
    const response = await fetch(baseUrl + url, requestOptions)
    return handleResponse(response)
}

async function del(url: string) {

    const requestOptions = {
        method: 'DELETE',
        headers: await getHeaders()
    }
    const response = await fetch(baseUrl + url, requestOptions)
    return handleResponse(response)
}

async function handleResponse(response: Response) {
    const text = await response.text();
    let data;
    try {
        data = text ? JSON.parse(text) : null
    } catch {
        data = text
    }
    if (response.ok) {
        return data || response.statusText
    } else {
        const error = {
            status: response.status,
            message: typeof data === 'string' ? data : response.statusText
        }
        return {error}
    }
}

async function getHeaders() {
    const session = await auth();

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    // Add authorization header if user is authenticated
    if (session?.accessToken) {
        headers["Authorization"] = `Bearer ${session.accessToken}`;
    }
    return headers;
}

export const fetchWrapper = {
    get,
    post,
    put,
    del
}