export type FileEvent = {
    [key: string]: FileData;
};
export type FileData = {
    file?: Array<File>;
    state?: boolean;
    message?: string;
};
export interface FilePickerOption {
    multiple?: boolean;
    accept?: string;
}
export declare const defaultOption: {
    multiple: boolean;
    accept: string;
};
export declare class FilePicker {
    private readonly option;
    private readonly input;
    private readonly emitter;
    constructor(option?: FilePickerOption);
    choose(): Promise<FileData>;
}
export default FilePicker;
