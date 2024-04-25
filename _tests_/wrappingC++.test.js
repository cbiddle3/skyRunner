const randomization = require('./../build/Release/randomization.node')

const allEqual = arr => arr.every(val => val === arr[0])

test('building returns expected type', () => {
  const building = randomization.GetRandomBuilding()
  expect(typeof building[0]).toBe('string')
  expect(typeof building[1]).toBe('string')
  expect(typeof building[2]).toBe('string')
})

test('gap function returns expected type', () => {
  const gap = randomization.GetRandomGap()
  expect(typeof gap).toBe('number')
})

test('properly set up functions for API calls', () => {
  expect(typeof randomization.GetRandomBuilding).toBe('function')
  expect(typeof randomization.GetRandomGap).toBe('function')
})

test('buildings are randomized', () => {
  const buildings = []
  for (let x = 0; x < 5; x++) {
    buildings.push(randomization.GetRandomBuilding()[0])
  }
  expect(allEqual(buildings)).toBeFalsy()
})

test('gaps are randomized', () => {
  const gaps = []
  for (let x = 0; x < 5; x++) {
    gaps.push(randomization.GetRandomGap())
  }
  expect(allEqual(gaps)).toBeFalsy()
})
