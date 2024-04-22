
var assert = require('assert')
var randomization = require('./build/Release/randomization.node')

assert.equal(typeof randomization.GetRandomBuilding, 'function')
assert.equal(typeof randomization.GetRandomGap, 'function')

// Test getRandomBuilding function
var building = randomization.GetRandomBuilding()
assert.equal(typeof building[0], 'string')
assert.equal(typeof building[1], 'string')
assert.equal(typeof building[2], 'string')

// Test getRandomGap function
var gap = randomization.GetRandomGap()
assert.equal(typeof gap, 'number')

console.log("All tests passed successfully!")