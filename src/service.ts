import { Bin } from './bin'

export class Service {
    private readonly bin: Bin

    constructor(bin: Bin) {
        this.bin = bin
    }

    // 上传文件
    async upload(source: string, object: Blob | ArrayBuffer) {
        return this.bin.uploadObject(source, object)
    }

    // 删除文件
    async remove(source: string) {
        return this.bin.removeObject(source)
    }

    // 复制文件
    async copy(source: string, target: string) {
        console.log(source)
        console.log(target)
    }
}

export default Service
