/**
 --- Part Two ---

 Time to check the rest of the slopes - you need to minimize the probability of a sudden arboreal stop, after all.

 Determine the number of trees you would encounter if, for each of the following slopes, you start at the top-left corner and traverse the map all the way to the bottom:

 Right 1, down 1.
 Right 3, down 1. (This is the slope you already checked.)
 Right 5, down 1.
 Right 7, down 1.
 Right 1, down 2.

 In the above example, these slopes would find 2, 7, 3, 4, and 2 tree(s) respectively; multiplied together, these produce the answer 336.

 What do you get if you multiply together the number of trees encountered on each of the listed slopes?
 */

import { readFileSync } from 'fs'

const testValues = readFileSync('challenge_05.txt', 'utf8').trimEnd().split('\n')
const sampleValues = Array.of(
    "..##.......",
    "#...#...#..",
    ".#....#..#.",
    "..#.#...#.#",
    ".#...##..#.",
    "..#.##.....",
    ".#.#.#....#",
    ".#........#",
    "#.##...#...",
    "#...##....#",
    ".#..#...#.#",
)

let position = {x: 0, y: 0}
let steps = Array.of({x: 1, y: 1}, {x: 3, y: 1}, {x: 5, y: 1}, {x: 7, y: 1}, {x: 1, y: 2})

let path = {currentPosition: position, trees: 0}

function move(path, step, forrest) {
    let nextPosition = {
        x: (path.currentPosition.x + step.x) % forrest[0].length,
        y: (path.currentPosition.y + step.y)
    }
    let trees = path.trees
    if (forrest[nextPosition.y][nextPosition.x] == "#") {
        trees += 1
    }
    return {currentPosition: nextPosition, trees: trees}
}

function moveToEnd(path, step, forrest) {
    let currentPath = path
    while (currentPath.currentPosition.y < forrest.length - 1) {
        // console.log(currentPath)
        currentPath = move(currentPath, step, forrest)
    }
    return currentPath.trees
}

let total = steps.map(step => moveToEnd(path, step, testValues)).reduce((a, b) => a * b)
console.log(total)
