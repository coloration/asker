import { ResponseHeaders, AskerConf } from './type';
export declare function object2Query(obj: Object, encode?: boolean): string;
export declare function object2Json(obj: Object): string;
export declare function object2formdata(obj: Object): FormData;
export declare function merge(o: any, ...args: Object[]): any;
export declare function getResHeaders(xhr: XMLHttpRequest): ResponseHeaders;
export declare function mergeConf(conf1: AskerConf, conf2: AskerConf): AskerConf;
