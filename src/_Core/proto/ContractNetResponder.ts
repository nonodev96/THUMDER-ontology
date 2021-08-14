import { ACLMessage, Performative } from "../ACLMessage"
import { Behaviour } from "../behaviours/Behaviour"

export abstract class ContractNetResponder extends Behaviour {
    private readonly className: string
    public myPropose: ACLMessage
    public cfp: ACLMessage

    protected constructor(taskName: string) {
        super(taskName)
        this.className = ContractNetResponder.name
        this.myPropose = new ACLMessage()
        this.cfp = new ACLMessage()
    }

    public getClassName(): string {
        return this.className
    }

    public handleAllResponses(messages: ACLMessage[]): ACLMessage | null {
        for (const message of messages) {
            switch (message.getPerformative()) {
                case Performative.CFP:
                    return this.handleCfp(message)
                case Performative.ACCEPT_PROPOSAL:
                    return this.handleAcceptProposal(this.cfp, this.myPropose, message)
                case Performative.REJECT_PROPOSAL:
                    return this.handleRejectProposal(this.cfp, this.myPropose, message)
            }
        }
        return null
    }

    public abstract handleCfp(cfp: ACLMessage): ACLMessage

    public abstract handleAcceptProposal(cfp: ACLMessage, propose: ACLMessage, accept: ACLMessage): ACLMessage

    public abstract handleRejectProposal(cfp: ACLMessage, propose: ACLMessage, reject: ACLMessage): ACLMessage
}