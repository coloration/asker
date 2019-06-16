import { 
  defConf,
  AskerConf, GetLikeMethod, PostLikeMethod, PostLike, GetLike
} from './util/type'
import { mergeConf } from './util/format'
import { jsonp, batch, getGen, postGen } from './method/index'


export default class Asker {

  public static conf: AskerConf = mergeConf({}, defConf)

  public conf: AskerConf
  
  constructor(conf?: AskerConf) {
    this.conf = mergeConf(Asker.conf, conf)
  }

  public get: GetLike = getGen(GetLikeMethod.get)
  public head: GetLike = getGen(GetLikeMethod.head)
  public option: GetLike = getGen(GetLikeMethod.option)

  public post: PostLike = postGen(PostLikeMethod.post)
  public put: PostLike = postGen(PostLikeMethod.put)
  public patch: PostLike = postGen(PostLikeMethod.patch)
  public delete: PostLike = postGen(PostLikeMethod.delete)

  public jsonp: GetLike = jsonp
  public batch = batch

  public static get: GetLike = staticGen(GetLikeMethod.get)
  public static head: GetLike = staticGen(GetLikeMethod.head)
  public static option: GetLike = staticGen(GetLikeMethod.option)
  public static post: PostLike = staticGen(PostLikeMethod.post)
  public static put: PostLike = staticGen(PostLikeMethod.put)
  public static patch: PostLike = staticGen(PostLikeMethod.patch)
  public static delete: PostLike = staticGen(PostLikeMethod.delete)
  
  public static jsonp: PostLike = staticGen('jsonp' as any)
  public static batch: PostLike = staticGen('batch' as any)

}

let instance: Asker = null

function staticGen (method: GetLikeMethod | PostLikeMethod) {
  return function () {
    instance = instance || new Asker()
    return instance[method].apply(instance, arguments)
  }
}




