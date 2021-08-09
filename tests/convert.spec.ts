import { Utils } from "../src";

describe("Check Utils", () => {
    test("Check Utils.Convert 08 bits", () => {
        expect(Utils.Convert.NumberToInt8(127)).toBe(127)
        expect(Utils.Convert.NumberToInt8(127 + 1)).not.toBe(127 + 1)

        expect(Utils.Convert.NumberToUint8(255)).toBe(255)
        expect(Utils.Convert.NumberToUint8(255 + 1)).not.toBe(255 + 1)
    });
    test("Check Utils.Convert 16 bits", () => {
        expect(Utils.Convert.NumberToInt16(32767)).toBe(32767)
        expect(Utils.Convert.NumberToInt16(32767 + 1)).not.toBe(32767 + 1)

        expect(Utils.Convert.NumberToUint16(65535)).toBe(65535)
        expect(Utils.Convert.NumberToUint16(65535 + 1)).not.toBe(65535 + 1)
    });
    test("Check Utils.Convert 32 bits", () => {
        expect(Utils.Convert.NumberToInt32(2147483647)).toBe(2147483647)
        expect(Utils.Convert.NumberToInt32(2147483647 + 1)).not.toBe(2147483647 + 1)

        expect(Utils.Convert.NumberToUint32(4294967295)).toBe(4294967295)
        expect(Utils.Convert.NumberToUint32(4294967295 + 1)).not.toBe(4294967295 + 1)
    });
});