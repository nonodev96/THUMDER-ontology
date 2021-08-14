import { Performative, AchieveREResponder, ACLMessage } from "../../../dist";

export class Task_RequestResponse extends AchieveREResponder {

    constructor() {
        super();
    }

    getMessage(): ACLMessage {
        return new ACLMessage()
    }

    handleRequest(request: ACLMessage): ACLMessage {
        console.log("Task_RequestResponse handleRequest")
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