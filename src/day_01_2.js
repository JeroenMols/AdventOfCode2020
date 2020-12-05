/**
 --- Part Two ---

 The Elves in accounting are thankful for your help; one of them even offers you a starfish coin they had left over from a past vacation. They offer you a second one if you can find three numbers in your expense report that meet the same criteria.

 Using the above example again, the three entries that sum to 2020 are 979, 366, and 675. Multiplying them together produces the answer, 241861950.

 In your expense report, what is the product of the three entries that sum to 2020?

 */
import { readFileSync } from 'fs'

const testValues = readFileSync('../data/day_01.txt', 'utf8').trimEnd().split('\n').map(value => parseInt(value))
const sum = 2020
const sampleValues = Array(1721,979,366,299,675,1456)

function findValuesThatAddUpTo(values, sum) {
    let value, rest
    for (let i in values) {
        value = values[i]
        rest = diff(value, sum);
        if (values.includes(rest)) {
            return Array(value, rest)
        }
    }
    return null
}

function findThreeValuesThatAddUpTo(values, sum) {
    let value;
    for (let i in values) {
        value = values[i]
        let sumValues = findValuesThatAddUpTo(values, diff(value,sum))
        if (sumValues != null) {
            return Array(value, sumValues[0], sumValues[1])
        }
    }
    return null
}

function multiplyValuesThatAddUpTo(values, sum) {
    let sumValues = findThreeValuesThatAddUpTo(values, sum);
    if (sumValues != null) {
        return sumValues.reduce((previousValue, currentValue) => previousValue * currentValue)
    }
    return -1
}

function diff(value, maximum) {
 return maximum - value
}

let product = multiplyValuesThatAddUpTo(testValues, sum);
if (product > 0) {
    console.log("Found product: " + product)
} else {
    console.log("No elements that add up to " + sum)
}


