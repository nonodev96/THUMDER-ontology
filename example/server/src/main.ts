import { createServer } from "http";
import { Server } from "socket.io";
import {
    AchieveREResponder,
    AchieveREInitiator,
    ACLMessage,
    InteractionProtocol,
    MessageTemplate,
    Performative,
    CoreAgents
} from "../../../dist";


export const httpServer = createServer();
export const io = new Server(httpServer);

class Task_RequestResponse extends AchieveREResponder {

    constructor() {
        super();
    }

    handleRequest(request: ACLMessage): ACLMessage {
        console.log("Task_RequestResponse")
        const message_reply = request.createReply();
        message_reply.setPerformative(Performative.AGREE);
        return message_reply
    }

    prepareResultNotification(request: ACLMessage, response: ACLMessage): ACLMessage {
        const reply = request.createReply()
        reply.setPerformative(Performative.INFORM)
        return reply
    }


}


io.on("connection", (socket) => {
    console.log("connection")
    const coreAgents = new CoreAgents(socket);

    // const template = MessageTemplate.And(
    //     MessageTemplate.MatchProtocol(InteractionProtocol.FIPA_REQUEST.toString()),
    //     MessageTemplate.MatchPerformative(Performative.REQUEST.toString())
    // );
    coreAgents.addTask(new Task_RequestResponse());
});

io.on('connect', (socket) => {
    console.log('connect')
    console.log(socket.id)
})

httpServer.listen(3000);