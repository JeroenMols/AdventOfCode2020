/**
 --- Part Two ---

 As you finish the last group's customs declaration, you notice that you misread one word in the instructions:

 You don't need to identify the questions to which anyone answered "yes"; you need to identify the questions to which everyone answered "yes"!

 Using the same example as above:

 abc

 a
 b
 c

 ab
 ac

 a
 a
 a
 a

 b

 This list represents answers from five groups:

 In the first group, everyone (all 1 person) answered "yes" to 3 questions: a, b, and c.
 In the second group, there is no question to which everyone answered "yes".
 In the third group, everyone answered yes to only 1 question, a. Since some people did not answer "yes" to b or c, they don't count.
 In the fourth group, everyone answered yes to only 1 question, a.
 In the fifth group, everyone (all 1 person) answered "yes" to 1 question, b.

 In this example, the sum of these counts is 3 + 0 + 1 + 1 + 1 = 6.

 For each group, count the number of questions to which everyone answered "yes". What is the sum of those counts?

 */
import {readFileSync} from 'fs'

const testValues = readFileSync('../data/day_06.txt', 'utf8').trimEnd().split(/^\n/gm)
const sampleValues = Array.of(
    "abc",
    "a\nb\nc",
    "ab\nac",
    "a\na\na\na",
    "b")

function getAmountOfEntries(elements) {
    let lines = elements.trim().match(/\n/g);
    return lines ? lines.length + 1 : 1;
}

function mapValues(groupedElements) {
    return Array.from(groupedElements.values());
}

function countAlwaysElements(elements) {
    let passengers = getAmountOfEntries(elements);
    let groupedElements = new Map();
    elements.match(/[a-z]{1}/g).forEach(e => {
        groupedElements.set(e, (groupedElements.get(e) ?? 0) + 1)
    })
    return mapValues(groupedElements).map(v => v === passengers ? 1 : 0).reduce((p, n) => p + n)
}

let amountYes = testValues.map(value => countAlwaysElements(value)).reduce((p, n) => p + n)
console.log(amountYes)
