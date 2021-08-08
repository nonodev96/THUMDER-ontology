import { Md5 } from "md5-typescript";

describe("Check dependencies", () => {
    test("Check md5", () => {
        expect(Md5.init('Test md5')).toBe("00d73973aeeb3986e9d173198bbf1d05")
        expect(Md5.init('Hello world!')).toBe("86fb269d190d2c85f6e0468ceca42a20")
    });
});