/**
 --- Part Two ---

 It's getting pretty expensive to fly these days - not because of ticket prices, but because of the ridiculous number of bags you need to buy!

 Consider again your shiny gold bag and the rules from the above example:

 faded blue bags contain 0 other bags.
 dotted black bags contain 0 other bags.
 vibrant plum bags contain 11 other bags: 5 faded blue bags and 6 dotted black bags.
 dark olive bags contain 7 other bags: 3 faded blue bags and 4 dotted black bags.

 So, a single shiny gold bag must contain 1 dark olive bag (and the 7 bags within it) plus 2 vibrant plum bags (and the 11 bags within each of those): 1 + 1*7 + 2 + 2*11 = 32 bags!

 Of course, the actual rules have a small chance of going several levels deeper than this example; be sure to count all of the bags, even if the nesting becomes topologically impractical!

 Here's another example:

 shiny gold bags contain 2 dark red bags.
 dark red bags contain 2 dark orange bags.
 dark orange bags contain 2 dark yellow bags.
 dark yellow bags contain 2 dark green bags.
 dark green bags contain 2 dark blue bags.
 dark blue bags contain 2 dark violet bags.
 dark violet bags contain no other bags.

 In this example, a single shiny gold bag must contain 126 other bags.

 How many individual bags are required inside your single shiny gold bag?

 */
import {readFileSync} from 'fs'

const testValues = readFileSync('../data/day_07.txt', 'utf8').trimEnd().split('\n')
const sampleValues = Array.of(
    "shiny gold bags contain 2 dark red bags.",
    "dark red bags contain 2 dark orange bags.",
    "dark orange bags contain 2 dark yellow bags.",
    "dark yellow bags contain 2 dark green bags.",
    "dark green bags contain 2 dark blue bags.",
    "dark blue bags contain 2 dark violet bags.",
    "dark violet bags contain no other bags.",
)

function getBagsIn(bagRule) {
    return bagRule.match(/(?<=\d )[a-z]* [a-z]*(?= bag)/g) ?? Array.of();
}

function getCurrentBagRule(allBagsRules, currentBag) {
    let bagRule
    for (bagRule of allBagsRules) {
        if (bagRule.startsWith(currentBag)) {
            return bagRule
        }
    }
}

function getBagCount(currentBagRule, bagName) {
    return currentBagRule.match(new RegExp('[0-9]+' + " (?=" + bagName + ")"))[0]
}

function countBagsIn(currentBag, allBagsRules, parentCount) {
    let currentCount = 0
    let currentBagRule = getCurrentBagRule(allBagsRules, currentBag)
    let bags = getBagsIn(currentBagRule)
    if (bags.length === 0) return currentCount
    for (let bag of bags) {
        let bagCount = getBagCount(currentBagRule, bag) * parentCount;
        currentCount += bagCount
        currentCount += countBagsIn(bag, allBagsRules, bagCount)
    }
    return currentCount
}
function countAllBagsIn(bag, allBagsRules) {
    return countBagsIn(bag, allBagsRules, 1)
}

console.log(countAllBagsIn("shiny gold", testValues))
