export async function http<T>(
    request: RequestInfo
): Promise<T> {
    const response = await fetch(request);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

export async function get<T>(
    path: string,
    args: RequestInit = { method: 'get' }
): Promise<T> {
    return await http<T>(new Request(path, args));
}

export async function post<T, B>(
    path: string,
    body: B | undefined = undefined,
    args: RequestInit = {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json',
            'X-Auth-Token': '12345'
        }
    }
): Promise<T> {
    return await http<T>(new Request(path, args));
}