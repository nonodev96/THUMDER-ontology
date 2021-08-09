import { ACLMessage } from "../ACLMessage";

export abstract class ProposeInitiator {
    public abstract handleOutOfSequence(msg: ACLMessage): void;

    public abstract handleAllResponses(responses: ACLMessage[]): void;
}