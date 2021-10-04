import { AchieveREInitiator, AchieveREResponder, ACLMessage, AID, CreateFile, Ontology, Performative } from "../src";
import { plainToClass } from "class-transformer";


describe("Check Tasks", () => {
    test("Check Class call method", () => {
        class Task_CreateFile_RequestInitiator extends AchieveREInitiator {
            constructor(taskName: string, message: ACLMessage) {
                super(taskName, message)
            }

            handleAgree(agree: ACLMessage): any {
                return "Agree"
            }

            handleRefuse(refuse: ACLMessage): any {
                return "Refuse"
            }

            handleInform(inform: ACLMessage): any {
                return "Inform"
            }
        }

        class Task_CreateFile_RequestResponse extends AchieveREResponder {
            constructor(taskName: string) {
                super(taskName);
            }

            handleRequest(request: ACLMessage): ACLMessage {
                const createFile = plainToClass(CreateFile, <CreateFile>JSON.parse(request.getContent()));
                createFile.getNewFile();
                const message_reply = request.createReply();
                message_reply.setPerformative(Performative.AGREE);
                return message_reply
            }
        }

        const createFile = new CreateFile('path/to/folder', 'example_00.s')
        const createFile_string = JSON.stringify(createFile)
        const message = new ACLMessage()
        message.setSender(new AID({
            name: "Client",
            localName: "Client-" + '<this.coreAgents.clientID>',
            address: '<this.coreAgents.clientID>'
        }))
        message.setPerformative(Performative.REQUEST)
        message.setOntology(new Ontology("Make-File"))
        message.setContent(createFile_string)

        // Send request
        const createFileRequestInitiator = new Task_CreateFile_RequestInitiator("Make-File", message);

        // Capture the response
        const responses: ACLMessage = new Task_CreateFile_RequestResponse("Make-File").handleRequest(message)

        // Process the response
        const spy = jest.spyOn(createFileRequestInitiator, 'handler');
        const executeMethod = createFileRequestInitiator.handler(responses);

        expect(spy).toHaveBeenCalled();
        expect(executeMethod).resolves.toBe('Agree');

        spy.mockRestore();
    });
});