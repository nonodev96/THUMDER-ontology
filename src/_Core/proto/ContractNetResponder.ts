import { ACLMessage, Performative } from "../ACLMessage"
import { Behaviour } from "../behaviours/Behaviour"

export abstract class ContractNetResponder extends Behaviour {
    private readonly className: string
    public myPropose: ACLMessage
    public cfp: ACLMessage

    protected constructor() {
        super()
        this.className = ContractNetResponder.name
        this.cfp = new ACLMessage()
        this.myPropose = new ACLMessage()
    }

    public getClassName(): string {
        return this.className
    }

    public handleAllResponses(messages: ACLMessage[]): void {
        for (const message of messages) {
            switch (message.getPerformative()) {
                case Performative.CFP:
                    this.handleCfp(message)
                    break
                case Performative.ACCEPT_PROPOSAL:
                    this.handleAcceptProposal(this.cfp, this.myPropose, message)
                    break
                case Performative.REJECT_PROPOSAL:
                    this.handleRejectProposal(this.cfp, this.myPropose, message)
                    break
            }
        }
    }

    public abstract handleCfp(cfp: ACLMessage): ACLMessage

    public abstract handleAcceptProposal(cfp: ACLMessage, propose: ACLMessage, accept: ACLMessage): ACLMessage

    public abstract handleRejectProposal(cfp: ACLMessage, propose: ACLMessage, reject: ACLMessage): void
}