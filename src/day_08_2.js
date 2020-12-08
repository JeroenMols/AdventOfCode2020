/**
 * --- Part Two ---

 After some careful analysis, you believe that exactly one instruction is corrupted.

 Somewhere in the program, either a jmp is supposed to be a nop, or a nop is supposed to be a jmp. (No acc instructions were harmed in the corruption of this boot code.)

 The program is supposed to terminate by attempting to execute an instruction immediately after the last instruction in the file. By changing exactly one jmp or nop, you can repair the boot code and make it terminate correctly.

 For example, consider the same program from above:

 nop +0
 acc +1
 jmp +4
 acc +3
 jmp -3
 acc -99
 acc +1
 jmp -4
 acc +6

 If you change the first instruction from nop +0 to jmp +0, it would create a single-instruction infinite loop, never leaving that instruction. If you change almost any of the jmp instructions, the program will still eventually find another jmp instruction and loop forever.

 However, if you change the second-to-last instruction (from jmp -4 to nop -4), the program terminates! The instructions are visited in this order:

 nop +0  | 1
 acc +1  | 2
 jmp +4  | 3
 acc +3  |
 jmp -3  |
 acc -99 |
 acc +1  | 4
 nop -4  | 5
 acc +6  | 6

 After the last instruction (acc +6), the program terminates by attempting to run the instruction below the last instruction in the file. With this change, after the program terminates, the accumulator contains the value 8 (acc +1, acc +1, acc +6).

 Fix the program so that it terminates normally by changing exactly one jmp (to nop) or nop (to jmp). What is the value of the accumulator after the program terminates?

 */
import {readFileSync} from 'fs'

const testValues = readFileSync('../data/day_08.txt', 'utf8').trimEnd().split('\n')
const sampleValues = Array.of(
    "nop +0",
    "acc +1",
    "jmp +4",
    "acc +3",
    "jmp -3",
    "acc -99",
    "acc +1",
    "jmp -4",
    "acc +6",
)


function runInstruction(code, index, accStart) {
    let instruction = code[index]
    let amount = parseInt(instruction.match(/[+-]\d+/)[0])

    if (instruction.startsWith("jmp")) {
        index += amount
    } else if (instruction.startsWith("acc")) {
        accStart += amount
        index += 1
    } else {
        index += 1
    }
    return {index, accStart};
}

function tryExecuteCode(code, accTotal) {
    const executedInstructions = new Set()
    let index = 0
    let runProgram = true

    while (runProgram) {
        const result = runInstruction(code, index, accTotal);
        index = result.index;
        accTotal = result.accStart;
        if (executedInstructions.has(index) || index == code.length) {
            runProgram = false
        } else {
            executedInstructions.add(index)
        }
    }

    let programCompleted = index == code.length
    return {programCompleted, accTotal}
}

function findExecutableVariant(code) {
    let modifiedCode, result

    for (let index in code) {
        modifiedCode = [...code]

        if (code[index].startsWith("nop")) {
            modifiedCode[index] = code[index].replace("nop", "jmp")
        } else if (code[index].startsWith("jmp")) {
            modifiedCode[index] = code[index].replace("jmp", "nop")
        }

        result = tryExecuteCode(modifiedCode, 0)
        if (result.programCompleted) return result.accTotal
    }
}


console.log(findExecutableVariant(testValues))
