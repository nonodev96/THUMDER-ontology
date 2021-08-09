import { ACLMessage } from "../ACLMessage";

export abstract class AchieveREResponder {
    public abstract handleRequest(request: ACLMessage): ACLMessage;

    public abstract prepareResultNotification(request: ACLMessage, response: ACLMessage): ACLMessage;
}