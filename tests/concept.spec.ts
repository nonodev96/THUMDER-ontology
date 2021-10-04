import { Client, Server } from "../src";
import { AID } from "../src";

describe("Check Concept", () => {
    test("Check AgentCommunication", () => {
        const client = new Client("");
        client.setName("Client-123456")
        expect(client).toMatchObject(new Client("Client-123456"))

        const server = new Server("");
        server.setName("Server-123456")
        expect(server).toMatchObject(new Server("Server-123456"))
    });

    test("Check AID", () => {
        const sender = new AID({
            name: 'Client',
            localName: 'Client-123456',
            address: 'localhost:4200'
        })
        expect(sender).toMatchObject({
            "name": "Client",
            "localName": "Client-123456",
            "address": "localhost:4200",
        })
    });
});