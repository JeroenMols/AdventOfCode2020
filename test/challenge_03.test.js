import {countOccurrences, insertUniformSeparator} from "../challenge_03.js";
import * as assert from "assert";


describe('Test data conversion', () => {

    it('insert uniform data separators', () => {
        let data = "1-3 a: abcde"

        assert.equal(insertUniformSeparator(data), "1|3|a|abcde");
    });

    it('count occurrence of letter', () => {
        let data = "aaab"
        assert.equal(countOccurrences(data, "a"), 3);
    });

});
