export interface CustomOption {
    header?: Record<string, any>;
}
export declare function create(url: string, method: string, data?: Record<string, any> | Array<Record<string, any>>, option?: CustomOption): Promise<Response>;
declare const _default: {
    create: typeof create;
};
export default _default;
