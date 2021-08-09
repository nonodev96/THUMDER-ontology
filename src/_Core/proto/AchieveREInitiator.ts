import { ACLMessage } from "../ACLMessage";

export abstract class AchieveREInitiator {
    public abstract handleAllResponses(responses: ACLMessage[]): void;

    public abstract handleAllResultNotifications(resultNotifications: ACLMessage[]): void;

    public abstract handleOutOfSequence(msg: ACLMessage): void;
}