export interface CustomOption {
    header?: Record<string, any>;
}
export declare function create(url: string, method: string, object: null | undefined | Blob | ArrayBuffer, option?: CustomOption): Promise<Response>;
declare const _default: {
    create: typeof create;
};
export default _default;
