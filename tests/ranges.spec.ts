import { CONVERT, UInt8, UInt16, UInt32, UInt64 } from "../src";

describe("Check ranges", () => {
    test("Check UInt8", () => {
        const number = new UInt8();
        number.value = 255;
        expect(number.value).toBe(255)
    });
    test("Check UInt8 throw", () => {
        expect(() => {
            const number = new UInt8();
            number.value = 255 + 1
        }).toThrow("Range error")
    });
    test("Check UInt16", () => {
        const number = new UInt16();
        number.value = 65535;
        expect(number.value).toBe(65535)
    });
    test("Check UInt16 throw", () => {
        expect(() => {
            const number = new UInt16();
            number.value = 65535 + 1
        }).toThrow("Range error")
    });
    test("Check UInt32", () => {
        const number = new UInt32();
        number.value = 4294967295;
        expect(number.value).toBe(4294967295)
    });
    test("Check UInt32 throw", () => {
        expect(() => {
            const number = new UInt32();
            number.value = 4294967295 + 1
        }).toThrow("Range error")
    });
    test("Check UInt64", () => {
        const number = new UInt64();
        number.value = 18446744073709551615;
        expect(number.value).toBe(18446744073709551615)
    });
    test("Check UInt64 not throw", () => {
        const number = new UInt64();
        number.value = 18446744073709551615;
        expect(number.value).toBe(18446744073709552000)
    });
});