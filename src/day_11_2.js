/**
 --- Part Two ---

 As soon as people start to arrive, you realize your mistake. People don't just care about adjacent seats - they care about the first seat they can see in each of those eight directions!

 Now, instead of considering just the eight immediately adjacent seats, consider the first seat in each of those eight directions. For example, the empty seat below would see eight occupied seats:

 .......#.
 ...#.....
 .#.......
 .........
 ..#L....#
 ....#....
 .........
 #........
 ...#.....

 The leftmost empty seat below would only see one empty seat, but cannot see any of the occupied ones:

 .............
 .L.L.#.#.#.#.
 .............

 The empty seat below would see no occupied seats:

 .##.##.
 #.#.#.#
 ##...##
 ...L...
 ##...##
 #.#.#.#
 .##.##.

 Also, people seem to be more tolerant than you expected: it now takes five or more visible occupied seats for an occupied seat to become empty (rather than four or more from the previous rules). The other rules still apply: empty seats that see no occupied seats become occupied, seats matching no rule don't change, and floor never changes.

 Given the same starting layout as above, these new rules cause the seating area to shift around as follows:

 L.LL.LL.LL
 LLLLLLL.LL
 L.L.L..L..
 LLLL.LL.LL
 L.LL.LL.LL
 L.LLLLL.LL
 ..L.L.....
 LLLLLLLLLL
 L.LLLLLL.L
 L.LLLLL.LL

 #.##.##.##
 #######.##
 #.#.#..#..
 ####.##.##
 #.##.##.##
 #.#####.##
 ..#.#.....
 ##########
 #.######.#
 #.#####.##

 #.LL.LL.L#
 #LLLLLL.LL
 L.L.L..L..
 LLLL.LL.LL
 L.LL.LL.LL
 L.LLLLL.LL
 ..L.L.....
 LLLLLLLLL#
 #.LLLLLL.L
 #.LLLLL.L#

 #.L#.##.L#
 #L#####.LL
 L.#.#..#..
 ##L#.##.##
 #.##.#L.##
 #.#####.#L
 ..#.#.....
 LLL####LL#
 #.L#####.L
 #.L####.L#

 #.L#.L#.L#
 #LLLLLL.LL
 L.L.L..#..
 ##LL.LL.L#
 L.LL.LL.L#
 #.LLLLL.LL
 ..L.L.....
 LLLLLLLLL#
 #.LLLLL#.L
 #.L#LL#.L#

 #.L#.L#.L#
 #LLLLLL.LL
 L.L.L..#..
 ##L#.#L.L#
 L.L#.#L.L#
 #.L####.LL
 ..#.#.....
 LLL###LLL#
 #.LLLLL#.L
 #.L#LL#.L#

 #.L#.L#.L#
 #LLLLLL.LL
 L.L.L..#..
 ##L#.#L.L#
 L.L#.LL.L#
 #.LLLL#.LL
 ..#.L.....
 LLL###LLL#
 #.LLLLL#.L
 #.L#LL#.L#

 Again, at this point, people stop shifting around and the seating area reaches equilibrium. Once this occurs, you count 26 occupied seats.

 Given the new visibility method and the rule change for occupied seats becoming empty, once equilibrium is reached, how many seats end up occupied?

 */
import {readFileSync} from 'fs'

const testValues = readFileSync('../data/day_11.txt', 'utf8').trimEnd().split('\n')
const sampleValues = Array.of(
    "L.LL.LL.LL",
    "LLLLLLL.LL",
    "L.L.L..L..",
    "LLLL.LL.LL",
    "L.LL.LL.LL",
    "L.LLLLL.LL",
    "..L.L.....",
    "LLLLLLLLLL",
    "L.LLLLLL.L",
    "L.LLLLL.LL",
)

const directions = {
    UP: "up",
    DOWN: "down",
    LEFT: "left",
    RIGHT: "right",
    UP_LEFT: "up_left",
    UP_RIGHT: "up_right",
    DOWM_LEFT: "down_left",
    DOWN_RIGHT: "down_right"
}

function getNextPosition(position, direction) {
    switch (direction) {
        case directions.UP:
            return {x: position.x, y: position.y - 1}
        case directions.DOWN:
            return {x: position.x, y: position.y + 1}
        case directions.RIGHT:
            return {x: position.x + 1, y: position.y}
        case directions.LEFT:
            return {x: position.x - 1, y: position.y}
        case directions.UP_LEFT:
            return {x: position.x - 1, y: position.y - 1}
        case directions.UP_RIGHT:
            return {x: position.x + 1, y: position.y - 1}
        case directions.DOWM_LEFT:
            return {x: position.x - 1, y: position.y + 1}
        case directions.DOWN_RIGHT:
            return {x: position.x + 1, y: position.y + 1}
    }
}

function hasNeighbourInDirection(nextPos, seats, direction) {
    while (true) {
        if (nextPos.x < 0 || nextPos.x >= seats[0].length) {
            return false
        } else if (nextPos.y < 0 || nextPos.y >= seats.length) {
            return false
        } else if (seats[nextPos.y].charAt(nextPos.x) == "#") {
            return true
        } else if (seats[nextPos.y].charAt(nextPos.x) == "L") {
            return false
        } else {
            nextPos = getNextPosition(nextPos, direction)
        }
    }
}

function getOccupiedNeighbourCount(position, seats) {
    const directionsToCheck = Array.of(directions.UP, directions.DOWN, directions.LEFT, directions.RIGHT, directions.UP_LEFT, directions.UP_RIGHT, directions.DOWM_LEFT, directions.DOWN_RIGHT)
    let nextPos
    let occupiedNeighbours = 0
    for (let direction of directionsToCheck) {
        nextPos = getNextPosition(position, direction)
        occupiedNeighbours += hasNeighbourInDirection(nextPos, seats, direction) ? 1 : 0
    }
    return occupiedNeighbours
}

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function haveSameContents(first, second) {
    if (first.length != second.length) return false
    for (let i = 0; i < first.length; i++) {
        if (first[i] != second[i]) return false
    }
    return true;
}

function getNextSeatOccupation(seats) {
    let newSeats = [...seats]
    for (let x = 0; x < seats[0].length; x++) {
        for (let y = 0; y < seats.length; y++) {
            let occupiedNeighbours = getOccupiedNeighbourCount({x: x, y: y}, seats);
            if (seats[y].charAt(x) == ".") {
                // NOP
            } else if (seats[y].charAt(x) == "L" && occupiedNeighbours == 0) {
                newSeats[y] = newSeats[y].replaceAt(x, "#")
            } else if (seats[y].charAt(x) == "#" && occupiedNeighbours >= 5) {
                newSeats[y] = newSeats[y].replaceAt(x, "L")
            } else {
                // NOP
            }
        }
    }
    console.log(newSeats)
    return newSeats;
}

function findSteadyStateOccupation(startSeats) {
    let seats = startSeats
    let finished = false
    while (!finished) {
        let newSeats = getNextSeatOccupation(seats);
        if (haveSameContents(seats, newSeats)) {
            finished = true
        }
        seats = [...newSeats]
    }
    return seats.map(value => value.match(/#/g)?.length ?? 0).reduce((p, n) => p + n)
}

console.log(findSteadyStateOccupation(testValues))
