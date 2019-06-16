import { isNum } from './func'

export function splitBlob (blob: Blob, piece: number): Blob[] {
  
  if (!window.Blob) 
    return blob ? [blob] : []

  if (!(blob instanceof Blob)) 
    throw TypeError('need a Blob')
  
  if (!isNum(piece))
    throw ReferenceError('need a "piece" size')
  
  let total = blob.size
  let start = 0, end = start + piece
  const chunks: Blob[] = []

  while (start < total) {
    
    const chunk = blob.slice(start, end)

    chunks.push(chunk)

    start = end
    end = start + piece
    end = end < total ? end : total
  
  }

  return chunks
}

export function safeCall (exceptHandler: (e: Error) => Promise<any> | void) {

  return function safe (scopeFunction: (exceptHandler: Function) => any) {
    
    let scopeReturn: any

    try {
      scopeReturn = scopeFunction(exceptHandler)

      if (scopeReturn instanceof Promise) {
        scopeReturn.catch(exceptHandler as any)
      }
    }
    catch (e) {
      exceptHandler(e)
    }

    return scopeReturn
  }

}