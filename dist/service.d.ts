import { Bin } from './bin';
export declare class Service {
    private readonly bin;
    constructor(bin: Bin);
    upload(source: string, object: Blob | ArrayBuffer): Promise<Response>;
    remove(source: string): Promise<Response>;
    copy(source: string, target: string): Promise<void>;
}
export default Service;
