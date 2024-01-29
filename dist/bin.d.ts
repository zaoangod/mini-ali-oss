export interface Config {
    key: string;
    secret: string;
    bucket: string;
    region: string;
}
export declare class Bin {
    private debug;
    private config;
    constructor(config: Config, debug?: boolean);
    uploadObject(source: string, object: Blob | ArrayBuffer): Promise<Response>;
    removeObject(source: string, header?: Record<string, any>): Promise<Response>;
    requestConfig(method: string, source: string, header?: Record<string, any>): Promise<{
        baseURL: string;
        header: Record<string, any>;
    }>;
    signature(method: string, source: string, header: Record<string, any>): Promise<string>;
    clean(source: string): string;
    contentType(source: string): string;
}
export default Bin;
