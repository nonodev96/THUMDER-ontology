import { CONVERT } from "../src/Utils";


describe("Simple expression tests", () => {
    test("Check CONVERT.NumberToInt8()", () => {
        expect(CONVERT.NumberToInt8(127)).toBe(127)
        expect(CONVERT.NumberToInt8(128)).toBe(-128)
    });
    test("Check addition", () => {
    });
    test("Check subtraction", () => {
    });
    test("Check multiplication", () => {
    });
    test("Check division", () => {
    });
});