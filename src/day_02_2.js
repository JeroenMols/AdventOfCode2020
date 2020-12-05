/**
 --- Part Two ---

 While it appears you validated the passwords correctly, they don't seem to be what the Official Toboggan Corporate Authentication System is expecting.

 The shopkeeper suddenly realizes that he just accidentally explained the password policy rules from his old job at the sled rental place down the street! The Official Toboggan Corporate Policy actually works a little differently.

 Each policy actually describes two positions in the password, where 1 means the first character, 2 means the second character, and so on. (Be careful; Toboggan Corporate Policies have no concept of "index zero"!) Exactly one of these positions must contain the given letter. Other occurrences of the letter are irrelevant for the purposes of policy enforcement.

 Given the same example list from above:

 1-3 a: abcde is valid: position 1 contains a and position 3 does not.
 1-3 b: cdefg is invalid: neither position 1 nor position 3 contains b.
 2-9 c: ccccccccc is invalid: both position 2 and position 9 contain c.

 How many passwords are valid according to the new interpretation of the policies?
 */
import { readFileSync } from 'fs'

const testValues = readFileSync('../data/day_02.txt', 'utf8').trimEnd().split('\n')
const sampleValues = Array.of("1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc",)

function insertUniformSeparator(value) {
    return value.replace(/-|: | /g, '|')
}

function isValidPassword(value) {
    let split = value.split('|');
    let password = split[3];
    let letter = split[2]

    if (password[split[0] - 1] == letter && password[split[1] - 1] != letter) {
        return true;
    } else if (password[split[0] - 1] != letter && password[split[1] - 1] == letter) {
        return true;
    }
    return false;
}

function mapBooleanToInt(value) {
    if (value) {
        return 1
    } else {
        return 0
    }
}

function checkPasswords(passwords) {
    return passwords.map(value => insertUniformSeparator(value))
        .map(value => isValidPassword(value))
        .map(value => mapBooleanToInt(value))
        .reduce((previous, current) => previous + current)
}

console.log(checkPasswords(testValues))
