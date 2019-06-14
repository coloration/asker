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


