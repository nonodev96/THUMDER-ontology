import { ACLMessage } from "../ACLMessage";

export abstract class ProposeResponder {
    public abstract prepareResponse(propose: ACLMessage): ACLMessage;
}