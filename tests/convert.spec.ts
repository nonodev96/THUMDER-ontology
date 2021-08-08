import { CONVERT } from "../src";

describe("Check Utils", () => {
    test("Check CONVERT 08 bits", () => {
        expect(CONVERT.NumberToInt8(127)).toBe(127)
        expect(CONVERT.NumberToInt8(127 + 1)).not.toBe(127 + 1)

        expect(CONVERT.NumberToUint8(255)).toBe(255)
        expect(CONVERT.NumberToUint8(255 + 1)).not.toBe(255 + 1)
    });
    test("Check CONVERT 16 bits", () => {
        expect(CONVERT.NumberToInt16(32767)).toBe(32767)
        expect(CONVERT.NumberToInt16(32767 + 1)).not.toBe(32767 + 1)

        expect(CONVERT.NumberToUint16(65535)).toBe(65535)
        expect(CONVERT.NumberToUint16(65535 + 1)).not.toBe(65535 + 1)
    });
    test("Check CONVERT 32 bits", () => {
        expect(CONVERT.NumberToInt32(2147483647)).toBe(2147483647)
        expect(CONVERT.NumberToInt32(2147483647 + 1)).not.toBe(2147483647 + 1)

        expect(CONVERT.NumberToUint32(4294967295)).toBe(4294967295)
        expect(CONVERT.NumberToUint32(4294967295 + 1)).not.toBe(4294967295 + 1)
    });
});