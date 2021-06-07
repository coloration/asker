export function splitBlob(blob, piece) {
  if (!window.Blob) return blob ? [blob] : []

  if (!(blob instanceof Blob)) {
    throw TypeError("first must be a Blob")
  }

  if (typeof piece !== 'number') {
    throw ReferenceError('must set a "piece" size')
  }

  let remainSize = blob.size
  let start = 0, end = start + piece
  const chunks = []

  while (start < remainSize) {
    const chunk = blob.slice(start, end)

    chunks.push(chunk)

    start = end
    end = start + piece
    end = end < remainSize ? end : remainSize
  }

  return chunks
}


export function safeCall (exceptHandler) {

  return function safe (scopeFunction) {
    
    let scopeReturn

    try {
      scopeReturn = scopeFunction(exceptHandler)

      if (scopeReturn instanceof Promise) {
        scopeReturn = scopeReturn.catch(exceptHandler)
      }
    }
    catch (e) {
      exceptHandler(e)
    }

    return scopeReturn
  }

}

export const HttpStatus = {
  continue: 100,
  switchingProtocols: 101,
  processing: 102,
  earlyHints: 103,

  ok: 200,
  created: 201,
  accepted: 202,
  nonauthoritativeInformation: 203,
  noContent: 204,
  resetContent: 205,
  partialContent: 206,
  multistatus: 207,
  alreadyReported: 208,
  imUsed: 226,

  multipleChoices: 300,
  movedPermanently: 301,
  found: 302,
  seeOther: 303,
  notModified: 304,
  useProxy: 305,
  switchProxy: 306,
  temporaryRedirect: 307,
  permanentRedirect: 308,

  badRequest: 400,
  unauthorized: 401,
  paymentRequired: 402,
  forbidden: 403,
  notFound: 404,
  methodNotAllowed: 405,
  notAcceptable: 406,
  proxyAuthenticationRequired: 407,
  requestTimeout: 408,
  conflict: 409,
  gone: 410,
  lengthRequired: 411,
  preconditionFailed: 412,
  requestEntityTooLarge: 413,
  requesturiTooLong: 414,
  unsupportedMediaType: 415,
  requestedRangeNotSatisfiable: 416,
  expectationFailed: 417,
  iAmATeapot: 418,
  misdirectedRequest: 421,
  unprocessableEntity: 422,
  locked: 423,
  unprocessableEntity: 424,
  tooEarly: 425,
  upgradeRequired: 426,
  preconditionRequired: 428,
  tooManyRequests: 429,
  requestHeaderFieldsTooLarge: 431,
  unavailableForLegalReasons: 451,

  internalServerError: 500,
  notImplemented: 501,
  badGateway: 502,
  serviceUnavailable: 503,
  gatewayTimeout: 504,
  httpVersionNotSupported: 505,
  variantAlsoNegotiates: 506,
  insufficientStorage: 507,
  loopDetected: 508,
  notExtended: 510,
  networkAuthenticationRequired: 511,
}