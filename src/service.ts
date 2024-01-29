import { Bin, Config } from './bin'
import { FileData, FilePicker } from './lib/file-picker'

export interface Result<T> {
    // 状态
    complete: boolean
    // 响应状态
    status: number
    // 响应头
    data: T
}

export interface UploadResult {
    url: string | null
    tag: string | null
    name: string | null
    requestId: string | null
}

export interface RemoveResult {
    url: string | null
    name: string | null
    requestId: string | null
}

export class Service {
    private readonly bin: Bin
    private readonly debug: boolean

    constructor(config: Config, debug: boolean = false) {
        this.bin = new Bin(config)
        this.debug = debug
    }

    // 选择文件
    async choose(): Promise<FileData> {
        let picker: FilePicker = new FilePicker()
        return await picker.choose()
    }

    // 上传文件
    async upload(source: string, file: Blob | ArrayBuffer): Promise<Result<UploadResult>> {
        let response: Response = await this.bin.uploadObject(source, file)
        if (this.debug) {
            console.info('Service -> upload, response:', response)
            console.info('Service -> upload, header:', response.headers)
        }
        if (response.ok && response.status == 200) {
            let header: Headers = response.headers
            return {
                complete: true,
                status: response.status,
                data: {
                    url: response.url,
                    tag: header.get('etag')?.replaceAll('"', ''),
                    name: source,
                    requestId: header.get('x-oss-request-id')
                }
            } as Result<UploadResult>
        } else {
            return {
                complete: false,
                status: response.status,
                data: {
                    url: null,
                    tag: null,
                    name: null,
                    requestId: null
                }
            } as Result<UploadResult>
        }
    }

    // 删除文件
    async remove(source: string): Promise<Result<RemoveResult>> {
        let response: Response = await this.bin.removeObject(source)
        if (this.debug) {
            console.info('Service -> remove, response:', response)
            console.info('Service -> remove, header:', response.headers)
        }
        let header: Headers = response.headers
        let result: Result<RemoveResult> = {
            complete: false,
            status: 500,
            data: {
                url: null,
                name: source,
                requestId: null
            }
        }
        if (response.ok && response.status == 204) {
            result = {
                status: response.status,
                complete: true,
                data: {
                    url: response.url,
                    name: source,
                    requestId: header.get('x-oss-request-id')
                }
            }
        }
        return result
    }

    // 复制文件
    async copy(source: string, target: string) {
        console.log(source)
        console.log(target)
    }
}

export default Service
