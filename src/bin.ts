import SHA1 from './lib/sha/sha1'
import standard from './lib/standard'
import Request, { CustomOption } from './lib/request'

export interface Config {
    key: string
    secret: string
    bucket: string
    region: string
}

export class Bin {
    private debug: boolean
    private config: Config = {
        key: '',
        secret: '',
        bucket: '',
        region: ''
    }

    public constructor(config: Config, debug: boolean = false) {
        this.config.key = config.key || ''
        this.config.secret = config.secret || ''
        this.config.bucket = config.bucket || ''
        this.config.region = config.region || ''
        this.debug = debug
    }

    async uploadObject(source: string, object: Blob | ArrayBuffer) {
        source = this.clean(source)
        const config = await this.requestConfig('PUT', source)
        let option: CustomOption = { header: config.header }
        return await Request.create(`${config.baseURL}/${source}`, 'PUT', object, option)
    }

    async removeObject(source: string, header?: Record<string, any>) {
        source = this.clean(source)
        const config = await this.requestConfig('DELETE', source, header)
        let option: CustomOption = { header: config.header }
        return await Request.create(`${config.baseURL}/${source}`, 'DELETE', undefined, option)
    }

    // request配置
    async requestConfig(method: string, source: string, header: Record<string, any> = {}) {
        let date: string = new Date().toUTCString()
        header['Date'] = date
        header['x-oss-date'] = date
        header['Content-MD5'] = ''
        header['Content-Type'] = this.contentType(source)
        header['Authorization'] = await this.signature(method, source, header)
        const baseURL: string = `http://${this.config.bucket}.${this.config.region}.aliyuncs.com`
        if (this.debug) {
            console.info('Bin -> requestConfig, header:', header)
            console.info('Bin -> requestConfig, baseURL:', baseURL)
        }
        return { baseURL, header }
    }

    // 签名
    async signature(method: string, source: string, header: Record<string, any>) {
        const signs: string[] = []
        const xOssList: string[] = []
        Object.keys(header).forEach((key: string) => {
            let value = header[key]
            key.startsWith('x-oss') && xOssList.push(key + ':' + value)
        })

        signs.push(method?.toUpperCase() || '')
        signs.push(header['Content-Md5'] || '')
        signs.push(header['Content-Type'] || '')
        signs.push(header.Date || '')
        signs.push(...xOssList.sort())
        signs.push(`/${this.config.bucket}/${source}`)

        let signature: string = new SHA1('SHA-1', 'TEXT', {
            hmacKey: { value: this.config.secret, format: 'TEXT' }
        })
            .update(signs.join('\n'))
            .getHash('B64')
            .toString()

        return `OSS ${this.config.key}:${signature}`
    }

    clean(source: string) {
        return source
            .split('/')
            .filter((i) => i.length != 0)
            .join('/')
    }

    contentType(source: string) {
        let source_list: string[] = source.split('.')
        let source_suffix: string[] = source_list.splice(-1)
        if (source_suffix.length != 1) {
            return ''
        }
        console.info(source)
        console.info(source_suffix)
        let type: string = ''
        Object.keys(standard).forEach((key: string) => {
            let suffix_list: string[] = standard[key]
            if (Array.isArray(suffix_list)) {
                suffix_list.forEach((suffix) => {
                    if (suffix == source_suffix[0]?.toLowerCase()) {
                        type = key
                    }
                })
            }
        })
        console.info('Bin -> contentType, type:', type)
        return type
    }
}

export default Bin
