import { isFunc, isObj, isNum, isPositive, isUnd, isArr } from './func'

describe('isFunc', () => {

  test('is not a function', () => {
    expect(isFunc('any string')).toBe(false)
    expect(isFunc(1.2)).toBe(false)
    expect(isFunc('')).toBe(false)
    expect(isFunc(false)).toBe(false)
    expect(isFunc(null)).toBe(false)
    expect(isFunc(undefined)).toBe(false)
    expect(isFunc(0)).toBe(false)
    expect(isFunc({})).toBe(false)
    expect(isFunc(/(a|b)/g)).toBe(false)
  })

  test('is a function', () => {
    expect(isFunc(() => {})).toBe(true)
    
    var data = {
      a () { return true }
    }

    expect(isFunc(data.a)).toBe(true)

  })
})

describe('isObj', () => {

  test('is not an object', () => {
    expect(isObj('any string')).toBe(false)
    expect(isObj(1.2)).toBe(false)
    expect(isObj('')).toBe(false)
    expect(isObj(false)).toBe(false)
    expect(isObj(null)).toBe(false)
    expect(isObj(undefined)).toBe(false)
    expect(isObj(0)).toBe(false)
    expect(isObj(/(a|b)/g)).toBe(false)
    expect(isObj(() => {})).toBe(false)

  })

  test('is an object', () => {
    expect(isObj({})).toBe(true)
  })
})

describe('isNum', () => {

  test('is not an number', () => {
    expect(isNum('any string')).toBe(false)
    expect(isNum('')).toBe(false)
    expect(isNum(false)).toBe(false)
    expect(isNum(null)).toBe(false)
    expect(isNum(undefined)).toBe(false)
    expect(isNum(/(a|b)/g)).toBe(false)
    expect(isNum(() => {})).toBe(false)
  })

  test('is an number', () => {
    expect(isNum(1.2)).toBe(true)
    expect(isNum(0)).toBe(true)
    expect(isNum(Math.PI)).toBe(true)
    expect(isNum(1e6)).toBe(true)
  })
})

describe('isPositive', () => {

  test('is not an positive', () => {
    expect(isPositive('any string')).toBe(false)
    expect(isPositive(null)).toBe(false)
    expect(isPositive(0)).toBe(false)
    expect(isPositive(-0.1)).toBe(false)
  })

  test('is an positive', () => {
    expect(isNum(1.2)).toBe(true)
    expect(isNum(Math.PI)).toBe(true)
    expect(isNum(1e6)).toBe(true)
  })
})

describe('isUnd', () => {
  test('is not Undefined', () => {
    expect(isUnd(0)).toBe(false)
    expect(isUnd(null)).toBe(false)
    expect(isUnd(false)).toBe(false)
    expect(isUnd(true)).toBe(false)
  })
  
  test('is Undefined', () => {
    expect(isUnd(undefined)).toBe(true)
  })
})


describe('isArr', () => {
  test('is not an array', () => {
    expect(isArr(new Buffer(8))).toBe(false)
    expect(isArr(new ArrayBuffer(8))).toBe(false)
    expect(isArr('string')).toBe(false)
  })

  test('is an array', () => {
    expect(isArr([5, 6, 7])).toBe(true)
    expect(isArr(new Array(2, 3))).toBe(true)
  })
})