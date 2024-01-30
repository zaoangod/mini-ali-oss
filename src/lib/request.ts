export interface CustomOption {
    header?: Record<string, any>
}

export async function create(url: string, method: string, object: null | undefined | Blob | ArrayBuffer, option?: CustomOption): Promise<Response> {
    const header: Record<string, any> = {
        'Content-Type': 'application/json',
        ...(option?.header || {})
    }
    method = (method || 'GET').toUpperCase()
    const init: RequestInit = {
        method: method,
        headers: header,
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow',
        credentials: 'same-origin',
        referrerPolicy: 'no-referrer'
    }
    if (!!object) {
        init.body = object
    }
    return fetch(new Request(url, init))
}

export default {
    create
}
