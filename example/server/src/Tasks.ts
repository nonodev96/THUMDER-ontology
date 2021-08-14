import { Performative, AchieveREResponder, ACLMessage } from "../../../dist";

export class Task_CreateFile_RequestResponse extends AchieveREResponder {
    constructor(taskName: string) {
        super(taskName);
    }

    handleRequest(request: ACLMessage): ACLMessage {
        console.log("Task_CreateFile_RequestResponse handleRequest", this.getTaskName())
        const message_reply = request.createReply();
        message_reply.setPerformative(Performative.AGREE);
        return message_reply
    }
}

export class Task_CreateFolder_RequestResponse extends AchieveREResponder {
    constructor(taskName: string) {
        super(taskName);
    }

    handleRequest(request: ACLMessage): ACLMessage {
        console.log("Task_CreateFolder_RequestResponse handleRequest", this.getTaskName())
        const message_reply = request.createReply();
        message_reply.setPerformative(Performative.AGREE);
        return message_reply
    }
}