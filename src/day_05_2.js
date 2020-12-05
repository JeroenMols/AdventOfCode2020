/**
 --- Part Two ---

 Ding! The "fasten seat belt" signs have turned on. Time to find your seat.

 It's a completely full flight, so your seat should be the only missing boarding pass in your list. However, there's a catch: some of the seats at the very front and back of the plane don't exist on this aircraft, so they'll be missing from your list as well.

 Your seat wasn't at the very front or back, though; the seats with IDs +1 and -1 from yours will be in your list.

 What is the ID of your seat?
 */
import {readFileSync} from 'fs'

const testValues = readFileSync('../data/day_05.txt', 'utf8').trimEnd().split('\n')
const sampleValues = Array.of(
    "FBFBBFFRLR", // row 44, column 5, seat ID 357.
    "BFFFBBFRRR", // row 70, column 7, seat ID 567.
    "FFFBBBFRRR", // row 14, column 7, seat ID 119.
    "BBFFBBFRLL", // row 102, column 4, seat ID 820.
)

function convertBinaryToInt(binary, upperIdentifier) {
    let number = 0
    for (let i = 0; i < binary.length; i++) {
        number += Math.pow(2, binary.length - i - 1) * getMultiplier(binary[i], upperIdentifier)
    }
    return number
}

function getMultiplier(column, upperIdentifier) {
    if (column == upperIdentifier) return 1
    return 0
}

function getSeatId(value) {
    let row = convertBinaryToInt(value.substr(0, 7), 'B');
    let seat = convertBinaryToInt(value.substr(7), 'R');
    let seatId = row * 8 + seat
    console.log(value + ": row " + row + ", seat " + seat + ", seat ID " + seatId)
    return seatId
}

function sortLowToHigh() {
    return (left, right) => {
        if (left > right) return 1
        else if (left < right) return -1
        else return 0
    };
}

function getAvailableSeats(binarySeats) {
    let occupied = binarySeats.map(value => getSeatId(value)).sort(sortLowToHigh());
    let availableSeats = Array()
    for (let i = 0; i< binarySeats.length-2; i++)
        if (occupied[i] +1 < occupied[i+1]) {
            console.log("available seat: " + (occupied[i] +1))
            if ((occupied[i] +1) < 8 || (occupied[i] +1) > (127 * 8)) {
            console.log("skipping due to front or back row")
                continue
            }
            availableSeats.push(occupied[i]+1)
        }
    return availableSeats;
}

console.log(getAvailableSeats(testValues))
