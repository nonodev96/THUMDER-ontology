import { ACLMessage, CFPSimulation, ContractNetInitiator, UInt8 } from "../src";
import { io } from "socket.io-client";

describe("Check Sockets", () => {
    test("Check CFP", () => {
/*
        class _CFPSimulation extends CFPSimulation implements ContractNetInitiator {
            handleInform(inform: ACLMessage): void {
            }

            handlePropose(propose: ACLMessage, acceptances: ACLMessage[]): void {
            }

            handleRefuse(refuse: ACLMessage): void {
            }
        }
*/
        // TODO
        expect(1).toEqual(1)
    });
});