export interface CustomOption {
    header?: Record<string, any>
}

export async function create(url: string, method: string, data?: Record<string, any> | Array<Record<string, any>>, option?: CustomOption): Promise<Response> {
    const header: Record<string, any> = {
        'Content-Type': 'application/json',
        ...(option?.header || {}),
    }
    method = (method || 'GET').toUpperCase()
    const init: RequestInit = {
        method: method,
        headers: header,
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow',
        credentials: 'same-origin',
        referrerPolicy: 'no-referrer',
    }
    console.info('init.headers:', init.headers)
    if (method == 'POST' || method == 'PUT') {
        init.body = JSON.stringify(data || {})
    }
    return fetch(new Request(url, init))
}

/*export async function get<T>(url: string, data: Record<string, any> = {}, option?: CustomOption): Promise<T> {
    return create(url, 'GET', data, option).then((response: Response) => response.json())
}

export async function post<T>(url: string, data: Record<string, any> = {}, option?: CustomOption): Promise<T> {
    return create(url, 'POST', data, option).then((response: Response) => response.json())
}

export async function put(url: string, data: Record<string, any> = {}, option?: CustomOption): Promise<Response> {
    return create(url, 'PUT', data, option)
}

export async function del<T>(url: string, data: Record<string, any> = {}, option?: CustomOption): Promise<T> {
    return create(url, 'DELETE', data, option).then((response: Response) => response.text())
}*/

export default {
    create,
}
