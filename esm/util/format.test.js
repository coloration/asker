import { object2Query } from './format'

test('object2Query', () => {
  expect(object2Query({ a: 1 })).toBe('a=1')
  expect(object2Query({ a: 1, b: 'king' })).toBe('a=1&b=king')
})