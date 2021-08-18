import { io } from "socket.io-client";
import { CoreAgentsClient } from "../src";

describe("Check Sockets", () => {
    test("Check client", () => {
        // const socket = io('ws://localhost:3000/')
        // const coreAgents = new CoreAgentsClient(<any>socket)
        //
        // socket.on('connect', () => {
        //     console.log('connect')
        // })
        //
        // socket.on('connect_error', () => {
        //     console.log('connect_error')
        //     const t = () => {
        //         throw new TypeError("UNKNOWN ERROR");
        //     };
        //     expect(t).toThrow(TypeError);
        //     expect(t).toThrow("UNKNOWN ERROR");
        // })

        // TODO
        expect(1).toEqual(1)
    });
});