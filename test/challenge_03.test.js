
const assert = require('assert');
const insertUniformSeparator = require("../challenge_03");
const functions = require("../challenge_03");

describe('Test data conversion', () => {

    it('insert uniform data separators', () => {
        let data = "1-3 a: abcde"

        assert.equal(functions.insertUniformSeparator(data), "1|3|a|abcde");
    });

    it('count occurrence of letter', () => {
        let data = "aaab"
        assert.equal(functions.countOccurrences(data, "a"), 3);
    });

});
