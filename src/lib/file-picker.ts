import mitt, { Emitter } from './mitt'

export type FileEvent = {
    [key: string]: FileData
}

export type FileData = {
    file?: Array<File>
    state?: boolean
    message?: string
}

export interface FilePickerOption {
    multiple?: boolean
    accept?: string
}

export const defaultOption = {
    multiple: false,
    accept: '*',
}

export class FilePicker {
    private readonly option: FilePickerOption
    private readonly input: HTMLInputElement | null
    private readonly emitter: Emitter<FileEvent> | null

    constructor(option: FilePickerOption = defaultOption) {
        const createFileInput = (option: FilePickerOption, emitter: Emitter<FileEvent>) => {
            const input: HTMLInputElement = document.createElement('input')
            input.type = 'file'
            input.style.display = 'none'
            input.accept = option.accept || '*'
            input.multiple = option.multiple || false
            input.addEventListener('change', async (e) => {
                const file: FileList | null = (e.target as HTMLInputElement).files
                if (!file || file.length == 0) {
                    emitter.emit('failure', { file: [], state: false, message: 'The file list length is 0' })
                    return
                }
                try {
                    emitter.emit('success', { file: Array.from(file), state: true, message: '' })
                } catch (error) {
                    emitter.emit('failure', { file: [], state: false, message: String(error) })
                } finally {
                    input.value = ''
                }
            })
            document.body.appendChild(input)
            return input
        }

        this.option = option
        this.emitter = null
        this.emitter = mitt<FileEvent>()
        this.input = null
        this.input = createFileInput(this.option, this.emitter)
    }

    choose(): Promise<FileData> {
        this.input?.click()
        let emitter: Emitter<FileEvent> | null = this.emitter
        if (!this.input || !this.emitter) {
            return Promise.reject('input loss | emitter loss')
        }
        return new Promise<FileData>((resolve, reject) => {
            emitter?.on('success', (list: FileData) => {
                console.log('file', list)
                resolve(list)
            })
            emitter?.on('failure', (error: FileData) => {
                console.log('failure', error)
                reject(error)
            })
        })
    }
}

export default FilePicker
