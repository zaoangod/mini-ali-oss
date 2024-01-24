import { Bin, Config } from './bin'
import { FilePicker } from './lib/file-picker'

export class Service {
    private readonly bin: Bin

    constructor(config: Config) {
        this.bin = new Bin(config)
    }

    // 选择文件
    async choose() {
        let picker: FilePicker = new FilePicker()
        return await picker.choose()
    }

    // 上传文件
    async upload(source: string, file: Blob | ArrayBuffer) {
        return this.bin.uploadObject(source, file)
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
