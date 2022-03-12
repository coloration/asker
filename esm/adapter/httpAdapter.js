import http from 'http'
import https from 'https'
import url from 'url'
import zlib from 'zlib'
import { isHttpsProtocol, isStream, isArrayBuffer, isStr } from '../util/func'
import { createErr, stripBOM } from '../util/format'
import { ABORT, ERROR, TIMEOUT } from '../util/def' 
import { http as httpFollow, https as httpsFollow } from 'follow-redirects'

function setProxy(options, proxy, location) {
  options.hostname = proxy.host
  options.host = proxy.host
  options.port = proxy.port
  options.path = location

  // Basic proxy authorization
  if (proxy.auth) {
    var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64')
    options.headers['Proxy-Authorization'] = 'Basic ' + base64
  }

  // If a proxy is used, any redirects must also pass through the proxy
  options.beforeRedirect = function beforeRedirect(redirection) {
    redirection.headers.host = redirection.host
    setProxy(redirection, proxy, redirection.href)
  }
}


export default function httpAdapter (conf) {
  return new Promise(function httpPromiseCreator (resolve, _reject) {
    
    const parsedUrl = url.parse(conf.uri)
    const protocol = parsedUrl.protocol || 'http:'
    const isHttpsRequest = isHttpsProtocol(protocol)
    const agent = isHttpsRequest ? conf.httpsAgent : conf.httpAgent

    const reqHeaders = conf.headers
    const headerNameMap = Object.keys(reqHeaders).reduce((map, key) => {
      map[key.toLowerCase()] = key
      return map
    }, {})

    let rejected = false
    var reject = function reject(value) {
      rejected = true
      _reject(value)
    }

    if ('user-agent' in headerNameMap) {
      if (!headers[headerNameMap['user-agent']]) {
        delete headers[headerNameMap['user-agent']]
      }
    }
    else {
      reqHeaders['User-Agent'] = 'coloration-asker'
    }

    const data = conf.body

    if (data && !isStream(data)) {
      if (Buffer.isBuffer(data)) {
        // Nothing to do...
      } else if (isArrayBuffer(data)) {
        data = Buffer.from(new Uint8Array(data))
      } else if (isStr(data)) {
        data = Buffer.from(data, 'utf-8')
      } else {
        return reject(createErr(
          null,
          'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
          ERROR,
          conf
        ))
      }

      if (conf.maxBodyLength > -1 && data.length > conf.maxBodyLength) {
        return reject(createErr(
          null,
          'Request body larger than maxBodyLength limit',
          ERROR,
          conf
        ))
      }

      // Add Content-Length header if data exists
      if (!headerNameMap['content-length']) {
        headers['Content-Length'] = data.length
      }
    }

    const options = {
      path: parsedUrl.path,
      method: conf.method.toUpperCase(),
      headers: conf.headers,
      agent,
      agents: { http: conf.httpAgent, https: conf.httpsAgent }
    }

    if (conf.socketPath) {
      options.socketPath = conf.socketPath
    } else {
      options.hostname = parsedUrl.hostname
      options.port = parsedUrl.port
    }

    const proxy = conf.proxy
    if (!proxy && proxy !== false) {
      const proxyEnv = protocol.slice(0, -1) + '_proxy';
      const proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()]
      if (proxyUrl) {
        const parsedProxyUrl = url.parse(proxyUrl)
        const noProxyEnv = process.env.no_proxy || process.env.NO_PROXY
        const shouldProxy = true

        if (noProxyEnv) {
          const noProxy = noProxyEnv.split(',').map(function trim(s) {
            return s.trim()
          });

          shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
            if (!proxyElement) return false
            if (proxyElement === '*') return true
            if (proxyElement[0] === '.' &&
                parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
              return true
            }

            return parsed.hostname === proxyElement
          });
        }

        if (shouldProxy) {
          proxy = {
            host: parsedProxyUrl.hostname,
            port: parsedProxyUrl.port,
            protocol: parsedProxyUrl.protocol
          };

          if (parsedProxyUrl.auth) {
            var proxyUrlAuth = parsedProxyUrl.auth.split(':');
            proxy.auth = {
              username: proxyUrlAuth[0],
              password: proxyUrlAuth[1]
            };
          }
        }
      }
    }

    if (proxy) {
      options.headers.host = parsedUrl.hostname + (parsedUrl.port ? ':' + parsedUrl.port : '');
      setProxy(options, proxy, protocol + '//' + parsedUrl.hostname + (parsedUrl.port ? ':' + parsedUrl.port : '') + options.path)
    }


    let transport
    const isHttpsProxy = isHttpsRequest && (proxy ? isHttpsProtocol(proxy.protocol) : true)

    if (conf.transport) {
      transport = conf.transport
    } else if (conf.maxRedirects === 0) {
      transport = isHttpsProxy ? https : http
    } else {
      if (conf.maxRedirects) {
        options.maxRedirects = conf.maxRedirects
      }
      if (conf.beforeRedirect) {
        options.beforeRedirect = conf.beforeRedirect
      }
      transport = isHttpsProxy ? httpsFollow : httpFollow
    }

    if (conf.maxBodyLength > -1) {
      options.maxBodyLength = conf.maxBodyLength
    }

    if (conf.insecureHTTPParser) {
      options.insecureHTTPParser = conf.insecureHTTPParser
    }

    var req = transport.request(options, function handleResponse(response) {
      if (req.aborted) return

      // uncompress the response body transparently if required
      var stream = response

      // return the last request in case of redirects
      var lastRequest = response.req || req


      // if no content, is HEAD request or decompress disabled we should not decompress
      if (response.statusCode !== 204 && lastRequest.method !== 'HEAD' && conf.decompress !== false) {
        switch (response.headers['content-encoding']) {
          /*eslint default-case:0*/
          case 'gzip':
          case 'compress':
          case 'deflate':
          // add the unzipper to the body stream processing pipeline
            stream = stream.pipe(zlib.createUnzip())

            // remove the content-encoding in order to not confuse downstream operations
            delete response.headers['content-encoding']
            break;
        }
      }
      const res = {
        status: response.statusCode,
        statusText: response.statusMessage,
        headers: response.headers,
        conf,
        request: lastRequest
      }

      if (conf.responseType === 'stream') {
        res.data = stream
        resolve(res)
      } else {
        var responseBuffer = []
        var totalResponseBytes = 0
        stream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk)
          totalResponseBytes += chunk.length

          // make sure the content length is not over the maxContentLength if specified
          if (conf.maxContentLength > -1 && totalResponseBytes > conf.maxContentLength) {
            // stream.destoy() emit aborted event before calling reject() on Node.js v16
            rejected = true
            stream.destroy()
            reject(createErr(
              res.status,
              'maxContentLength size of ' + config.maxContentLength + ' exceeded',
              res,
              conf
            ))
          }
        });

        stream.on('aborted', function handlerStreamAborted() {
          if (rejected) return
          stream.destroy()
          reject(createErr(
            res.status,
            'maxContentLength size of ' + config.maxContentLength + ' exceeded',
            res,
            conf,
          ))
        })

        stream.on('error', function handleStreamError(err) {
          if (req.aborted) return
          reject(createErr(null, Error, err, conf))
        })

        stream.on('end', function handleStreamEnd() {
          try {
            var responseData = responseBuffer.length === 1 ? responseBuffer[0] : Buffer.concat(responseBuffer)
            if (conf.responseType !== 'arraybuffer') {
              responseData = responseData.toString(conf.responseEncoding)
              if (!conf.responseEncoding || conf.responseEncoding === 'utf8') {
                responseData = stripBOM(responseData);
              }

              if (conf.responseType === 'json') {
                try {
                  responseData = JSON.parse(responseData)
                }
                catch (e) {
                  reject(createErr(null, 'response cannot be transfer to json', err, conf));
                }
              }
            }
            res.data = responseData
          } catch (err) {
            reject(createErr(null, Error, err, conf))
          }

          resolve(res)
        })
      }
    })

    // Handle errors
    req.on('error', function handleRequestError(err) {
      reject(createErr(null, Error, err, conf))
    })

    // set tcp keep alive to prevent drop connection by peer
    req.on('socket', function handleRequestSocket(socket) {
      // default interval of sending ack packet is 1 minute
      socket.setKeepAlive(true, 1000 * 60);
    })

    // Handle request timeout
    if (conf.timeout) {
      // This is forcing a int timeout to avoid problems if the `req` interface doesn't handle other types.
      var timeout = parseInt(conf.timeout, 10)

      if (isNaN(timeout)) {
        reject(createErr(
          null, 'error trying to parse `config.timeout` to int', null, conf,
        ))

        return
      }

      req.setTimeout(timeout, function handleRequestTimeout() {
        req.abort()
        reject(createErr(
          null,
          TIMEOUT,
          null,
          conf,
        ))
      })
    }

    if (conf.canceler) {
      conf.canceler.promise.then(function xhrCancel () {
        if (xhr) {
          req.abort()
          reject(createErr(
            null,
            ABORT,
            null,
            conf,
          ))
        }
      })
    }


    // Send the request
    if (isStream(data)) {
      data.on('error', function handleStreamError(err) {
        reject(createErr(null, ERROR, err))
      }).pipe(req)
    } else {
      req.end(data)
    }
  })
}