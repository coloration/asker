export declare function splitBlob(blob: Blob, piece: number): Blob[];
export declare function safeCall(exceptHandler: (e: Error) => Promise<any> | void): (scopeFunction: (exceptHandler: Function) => any) => any;
