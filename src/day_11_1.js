/**
 * --- Day 11: Seating System ---

 Your plane lands with plenty of time to spare. The final leg of your journey is a ferry that goes directly to the tropical island where you can finally start your vacation. As you reach the waiting area to board the ferry, you realize you're so early, nobody else has even arrived yet!

 By modeling the process people use to choose (or abandon) their seat in the waiting area, you're pretty sure you can predict the best place to sit. You make a quick map of the seat layout (your puzzle input).

 The seat layout fits neatly on a grid. Each position is either floor (.), an empty seat (L), or an occupied seat (#). For example, the initial seat layout might look like this:

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

 Now, you just need to model the people who will be arriving shortly. Fortunately, people are entirely predictable and always follow a simple set of rules. All decisions are based on the number of occupied seats adjacent to a given seat (one of the eight positions immediately up, down, left, right, or diagonal from the seat). The following rules are applied to every seat simultaneously:

 If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
 If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
 Otherwise, the seat's state does not change.

 Floor (.) never changes; seats don't move, and nobody sits on the floor.

 After one round of these rules, every seat in the example layout becomes occupied:

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

 After a second round, the seats with four or more occupied adjacent seats become empty again:

 #.LL.L#.##
 #LLLLLL.L#
 L.L.L..L..
 #LLL.LL.L#
 #.LL.LL.LL
 #.LLLL#.##
 ..L.L.....
 #LLLLLLLL#
 #.LLLLLL.L
 #.#LLLL.##

 This process continues for three more rounds:

 #.##.L#.##
 #L###LL.L#
 L.#.#..#..
 #L##.##.L#
 #.##.LL.LL
 #.###L#.##
 ..#.#.....
 #L######L#
 #.LL###L.L
 #.#L###.##

 #.#L.L#.##
 #LLL#LL.L#
 L.L.L..#..
 #LLL.##.L#
 #.LL.LL.LL
 #.LL#L#.##
 ..L.L.....
 #L#LLLL#L#
 #.LLLLLL.L
 #.#L#L#.##

 #.#L.L#.##
 #LLL#LL.L#
 L.#.L..#..
 #L##.##.L#
 #.#L.LL.LL
 #.#L#L#.##
 ..L.L.....
 #L#L##L#L#
 #.LLLLLL.L
 #.#L#L#.##

 At this point, something interesting happens: the chaos stabilizes and further applications of these rules cause no seats to change state! Once people stop moving around, you count 37 occupied seats.

 Simulate your seating area by applying the seating rules repeatedly until no seats change state. How many seats end up occupied?

 Your puzzle answer was 2324.
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

function getOccupiedNeighbourCount(position, seats) {
    let positionsToCheck = Array.of(
        {x: position.x - 1, y: position.y - 1},
        {x: position.x, y: position.y - 1},
        {x: position.x + 1, y: position.y - 1},
        {x: position.x - 1, y: position.y},
        {x: position.x + 1, y: position.y},
        {x: position.x - 1, y: position.y + 1},
        {x: position.x, y: position.y + 1},
        {x: position.x + 1, y: position.y + 1},
    )

    let occupiedNeighbours = positionsToCheck.map(pos => {
        if (pos.x < 0 || pos.x >= seats[0].length) return 0
        if (pos.y < 0 || pos.y >= seats.length) return 0
        if (seats[pos.y].charAt(pos.x) == "#") return 1
        return 0
    }).reduce((p, n) => p + n);
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
            } else if (seats[y].charAt(x) == "#" && occupiedNeighbours >= 4) {
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
