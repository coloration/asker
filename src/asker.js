import { mergeQueue, merge }  from './util/format'
import { ABORT, ERROR, TIMEOUT, defConf } from './util/def'
import cache from './cache'


function Asker (conf) {
  /// no new
  if (!(this instanceof Asker)) {
    return new Asker(conf)
  }

  const _conf = merge({}, Asker.conf, conf)

  this.conf = Object.assign(_conf, mergeQueue(Asker.conf, conf))

}

Asker.errorType = { ABORT, ERROR, TIMEOUT }
Asker.conf = merge({}, defConf)
Asker.cache = cache

export default Asker