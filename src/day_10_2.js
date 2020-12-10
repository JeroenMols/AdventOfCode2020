/**

 --- Part Two ---

 To completely determine whether you have enough adapters, you'll need to figure out how many different ways they can be arranged. Every arrangement needs to connect the charging outlet to your device. The previous rules about when adapters can successfully connect still apply.

 The first example above (the one that starts with 16, 10, 15) supports the following arrangements:

 (0), 1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19, (22)
 (0), 1, 4, 5, 6, 7, 10, 12, 15, 16, 19, (22)
 (0), 1, 4, 5, 7, 10, 11, 12, 15, 16, 19, (22)
 (0), 1, 4, 5, 7, 10, 12, 15, 16, 19, (22)
 (0), 1, 4, 6, 7, 10, 11, 12, 15, 16, 19, (22)
 (0), 1, 4, 6, 7, 10, 12, 15, 16, 19, (22)
 (0), 1, 4, 7, 10, 11, 12, 15, 16, 19, (22)
 (0), 1, 4, 7, 10, 12, 15, 16, 19, (22)

 (The charging outlet and your device's built-in adapter are shown in parentheses.) Given the adapters from the first example, the total number of arrangements that connect the charging outlet to your device is 8.

 The second example above (the one that starts with 28, 33, 18) has many arrangements. Here are a few:

 (0), 1, 2, 3, 4, 7, 8, 9, 10, 11, 14, 17, 18, 19, 20, 23, 24, 25, 28, 31,
 32, 33, 34, 35, 38, 39, 42, 45, 46, 47, 48, 49, (52)

 (0), 1, 2, 3, 4, 7, 8, 9, 10, 11, 14, 17, 18, 19, 20, 23, 24, 25, 28, 31,
 32, 33, 34, 35, 38, 39, 42, 45, 46, 47, 49, (52)

 (0), 1, 2, 3, 4, 7, 8, 9, 10, 11, 14, 17, 18, 19, 20, 23, 24, 25, 28, 31,
 32, 33, 34, 35, 38, 39, 42, 45, 46, 48, 49, (52)

 (0), 1, 2, 3, 4, 7, 8, 9, 10, 11, 14, 17, 18, 19, 20, 23, 24, 25, 28, 31,
 32, 33, 34, 35, 38, 39, 42, 45, 46, 49, (52)

 (0), 1, 2, 3, 4, 7, 8, 9, 10, 11, 14, 17, 18, 19, 20, 23, 24, 25, 28, 31,
 32, 33, 34, 35, 38, 39, 42, 45, 47, 48, 49, (52)

 (0), 3, 4, 7, 10, 11, 14, 17, 20, 23, 25, 28, 31, 34, 35, 38, 39, 42, 45,
 46, 48, 49, (52)

 (0), 3, 4, 7, 10, 11, 14, 17, 20, 23, 25, 28, 31, 34, 35, 38, 39, 42, 45,
 46, 49, (52)

 (0), 3, 4, 7, 10, 11, 14, 17, 20, 23, 25, 28, 31, 34, 35, 38, 39, 42, 45,
 47, 48, 49, (52)

 (0), 3, 4, 7, 10, 11, 14, 17, 20, 23, 25, 28, 31, 34, 35, 38, 39, 42, 45,
 47, 49, (52)

 (0), 3, 4, 7, 10, 11, 14, 17, 20, 23, 25, 28, 31, 34, 35, 38, 39, 42, 45,
 48, 49, (52)

 In total, this set of adapters can connect the charging outlet to your device in 19208 distinct arrangements.

 You glance back down at your bag and try to remember why you brought so many adapters; there must be more than a trillion valid ways to arrange them! Surely, there must be an efficient way to count the arrangements.

 What is the total number of distinct ways you can arrange the adapters to connect the charging outlet to your device?

 Answer:

 Although it hasn't changed, you can still get your puzzle input.

 You can also [Shareon Twitter Mastodon] this puzzle.
 */
import {readFileSync} from 'fs'

const testValues = readFileSync('../data/day_10.txt', 'utf8').trimEnd().split('\n')
const simpleSample = Array.of(
    "16",
    "8",
    "15",
    "5",
    "1",
    "11",
    "7",
    "19",
    "6",
    "12",
    "4",
)
const sampleValues = Array.of(
    "28",
    "33",
    "18",
    "42",
    "31",
    "14",
    "46",
    "20",
    "48",
    "47",
    "24",
    "23",
    "49",
    "45",
    "19",
    "38",
    "39",
    "11",
    "1",
    "32",
    "25",
    "35",
    "8",
    "17",
    "7",
    "9",
    "4",
    "2",
    "34",
    "10",
    "3",
)

function sortLowToHigh() {
    return (left, right) => {
        if (left > right) return 1
        else if (left < right) return -1
        else return 0
    };
}

function sortAdaptersAndAppendStartEnd(adapters) {
    adapters.push(0)
    let sorted = adapters.map(v => parseInt(v)).sort(sortLowToHigh());
    sorted.push(sorted[sorted.length - 1] + 3)
    return sorted;
}

// A diff of 2 between the previous and next means this number might be skippable
function calculateDiff(sorted) {
    let diff = Array()
    for (let i = 1; i < sorted.length - 2; i++) {
        if (sorted[i + 1])
            diff.push(sorted[i + 1] - sorted[i - 1])
    }
    return diff;
}

function getSkippableGroups(diff) {
    let individuallySkippable = 0
    let groupsOfThree = 0
    let j = 0
    while (j < diff.length) {
        let first = diff[j]
        let second = (j + 1) < diff.length ? diff[j + 1] : 0
        let third = (j + 2) < diff.length ? diff[j + 2] : 0

        if (first == 2 && second == 2 && third == 2) {
            groupsOfThree++
            j += 3
        } else if (first == 2 && second == 2) {
            individuallySkippable += 2
            j += 2
        } else if (first == 2) {
            individuallySkippable++
            j++
        } else {
            j++
        }
    }
    console.log("individually skippable: " + individuallySkippable + ", groupsOfThree: " + groupsOfThree)
    return {individuallySkippable, groupsOfThree};
}

/**
 * Groups of three only have 7 valid combinations. (all three can't be skipped at the same time
 *
 *  Note this algorithm isn't foolproof:
 *
 * - Not robust against groups of more than 3 skippable elements in a row
 * - Not robust against sequences of like 7 8 10 (8 wouldn't be considered skippable)
 */
function countCombinations(adapters) {
    let sorted = sortAdaptersAndAppendStartEnd(adapters);
    let diff = calculateDiff(sorted);
    let {individuallySkippable, groupsOfThree} = getSkippableGroups(diff);
    return Math.pow(7, groupsOfThree) * Math.pow(2, individuallySkippable)
}

console.log(countCombinations(testValues))
