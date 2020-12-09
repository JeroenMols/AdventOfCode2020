/**
 --- Part Two ---

 The final step in breaking the XMAS encryption relies on the invalid number you just found: you must find a contiguous set of at least two numbers in your list which sum to the invalid number from step 1.

 Again consider the above example:

 35
 20
 15
 25
 47
 40
 62
 55
 65
 95
 102
 117
 150
 182
 127
 219
 299
 277
 309
 576

 In this list, adding up all of the numbers from 15 through 40 produces the invalid number from step 1, 127. (Of course, the contiguous set of numbers in your actual list might be much longer.)

 To find the encryption weakness, add together the smallest and largest number in this contiguous range; in this example, these are 15 and 47, producing 62.

 What is the encryption weakness in your XMAS-encrypted list of numbers?

 */
import {readFileSync} from 'fs'

const testValues = readFileSync('../data/day_09.txt', 'utf8').trimEnd().split('\n')
const sampleValues = Array.of(
    "35",
    "20",
    "15",
    "25",
    "47",
    "40",
    "62",
    "55",
    "65",
    "95",
    "102",
    "117",
    "150",
    "182",
    "127",
    "219",
    "299",
    "277",
    "309",
    "576",
)

function isValidNumber(preamble, number) {
    let value, remainingPreamble
    for (let i in preamble) {
        value = preamble[i]
        remainingPreamble = preamble
        if (preamble.includes(""+(number - value))) {
            console.log("Valid number: " + number + " (" +value + ", " + (number-value) +")")
            return true
        }
    }
    return false
}

function getFirstInvalidNumber(numbers, preambleLength) {
    let preamble
    for (let i = preambleLength; i< numbers.length; i++) {
        preamble = numbers.slice(i-preambleLength, i)
        if (!isValidNumber(preamble, numbers[i])) return parseInt(numbers[i])
    }
}

function sortHighToLow() {
    return (left, right) => {
        if (left > right) return -1
        else if (left < right) return 1
        else return 0
    };
}

function sumMinAndMaxInRange(numbers, i, startIndex) {
    let sortedSequence = numbers.slice(i, startIndex+1).map(v => parseInt(v)).sort(sortHighToLow())
    return sortedSequence[0] + sortedSequence[sortedSequence.length - 1]
}

function findWeakness(numbers, preambleLength) {
    let invalidNumber = getFirstInvalidNumber(numbers, preambleLength)
    let sum, subIndex, finished
    for (let i = 0; i< numbers.length; i++) {
        finished = false
        subIndex = i
        sum = 0
        while (!finished) {
            sum += parseInt(numbers[subIndex])
            if (sum == invalidNumber) {
                console.log("Weakness found")
                return sumMinAndMaxInRange(numbers, i, subIndex);
            } else if (sum > invalidNumber) {
                console.log("No weakness starting from " + i)
                finished = true
            }
            subIndex += 1
        }
    }
}

console.log(findWeakness(testValues, 25))
