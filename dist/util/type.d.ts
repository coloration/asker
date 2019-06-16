export declare const CONTENT_TYPE = "Content-Type";
export declare enum AskerErrorType {
    ABORT = "ASKER:REQUEST_ABORT",
    ERROR = "ASKER:REQUEST_ERROR",
    TIMEOUT = "ASKER:REQUEST_TIMEOUT"
}
export declare class AskerError extends Error {
    message: AskerErrorType;
    constructor(message: AskerErrorType);
}
export declare type GetLike = (url: string, query?: any, conf?: AskerConf) => Promise<any>;
export declare type PostLike = (url: string, body?: any, conf?: AskerConf) => Promise<any>;
export declare enum GetLikeMethod {
    get = "get",
    head = "head",
    option = "option"
}
export declare enum PostLikeMethod {
    post = "post",
    put = "put",
    delete = "delete",
    patch = "patch"
}
export declare enum PostType {
    json = "json",
    formData = "form-data",
    text = "text",
    formUrlencoded = "form-urlencoded"
}
export declare type AskerConf = {
    url?: string;
    baseUrl?: string;
    query?: string;
    body?: any;
    params?: NormalObject;
    method?: GetLikeMethod | PostLikeMethod;
    headers?: NormalObject;
    postType?: PostType;
    responseType?: 'object' | 'json';
    timeout?: 0;
    validator?: (status: number) => boolean;
    before?: ConfTransfer | ConfTransfer[];
    after?: ResponseTransfer | ResponseTransfer[];
    adapter?: any;
    onError?: (err: AskerError, xhr: XMLHttpRequest, conf: AskerConf) => any;
    onAbort?: (err: AskerError, xhr: XMLHttpRequest, conf: AskerConf) => any;
    onTimeout?: (err: AskerError, xhr: XMLHttpRequest, conf: AskerConf) => any;
    onUploadProgress?: (e: ProgressEvent, xhr: XMLHttpRequest, conf: AskerConf) => any;
    onDownloadProgress?: (e: ProgressEvent, xhr: XMLHttpRequest, conf: AskerConf) => any;
    [key: string]: any;
};
export declare type ConfTransfer = (conf: AskerConf) => AskerConf;
export declare type ResponseTransfer = (response: any) => any;
export declare const defConf: AskerConf;
export declare type AskerJsonpConf = AskerConf & {
    jsonp?: string;
};
export declare type AskerBatchConf = AskerConf & {
    slice?: number;
    retry?: number;
};
export declare type ResponseHeaders = {
    [key: string]: string | string[];
};
export declare type AskerResponse = {
    data: any;
    status: number;
    statusText: string;
    headers: ResponseHeaders;
    conf: AskerConf;
    request: any;
};
export declare const defRes: AskerResponse;
export declare type NormalObject = {
    [key: string]: any;
};
