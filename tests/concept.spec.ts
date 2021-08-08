import { Client, Concept, Server } from "../src";

describe("Check Concept", () => {
    test("Check AgentCommunication", () => {
        const client = new Client("");
        client.setName("Client-123456")
        expect(client).toMatchObject(new Client("Client-123456"))

        const server = new Server("");
        server.setName("Server-123456")
        expect(server).toMatchObject(new Server("Server-123456"))
    });
});