import { Config } from './bin';
import { FileData } from './lib/file-picker';
export interface Result<T> {
    complete: boolean;
    status: number;
    data: T;
}
export interface UploadResult {
    url: string | null;
    tag: string | null;
    name: string | null;
    requestId: string | null;
}
export interface RemoveResult {
    url: string | null;
    name: string | null;
    requestId: string | null;
}
export declare class Service {
    private readonly bin;
    constructor(config: Config);
    choose(): Promise<FileData>;
    upload(source: string, file: Blob | ArrayBuffer): Promise<Result<UploadResult>>;
    remove(source: string): Promise<Result<RemoveResult>>;
    copy(source: string, target: string): Promise<void>;
}
export default Service;
