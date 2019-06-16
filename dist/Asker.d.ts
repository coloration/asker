import { AskerConf, PostLike, GetLike } from './util/type';
import { batch } from './method/index';
export default class Asker {
    static conf: AskerConf;
    conf: AskerConf;
    constructor(conf?: AskerConf);
    get: GetLike;
    head: GetLike;
    option: GetLike;
    post: PostLike;
    put: PostLike;
    patch: PostLike;
    delete: PostLike;
    jsonp: GetLike;
    batch: typeof batch;
    static get: GetLike;
    static head: GetLike;
    static option: GetLike;
    static post: PostLike;
    static put: PostLike;
    static patch: PostLike;
    static delete: PostLike;
    static jsonp: PostLike;
    static batch: PostLike;
}
