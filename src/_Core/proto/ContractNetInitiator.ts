import { ACLMessage } from "../ACLMessage";

export abstract class ContractNetInitiator {
    public abstract handleRefuse(refuse: ACLMessage): void;

    public abstract handlePropose(propose: ACLMessage, acceptances: ACLMessage[]): void;

    public abstract handleInform(inform: ACLMessage): void;
}