import { ACLMessage } from "../ACLMessage";

export abstract class ContractNetResponder {
    public abstract handleCfp(cfp: ACLMessage): ACLMessage ;

    public abstract handleAcceptProposal(cfp: ACLMessage, propose: ACLMessage, accept: ACLMessage): ACLMessage ;

    public abstract handleRejectProposal(cfp: ACLMessage, propose: ACLMessage, reject: ACLMessage): void;
}