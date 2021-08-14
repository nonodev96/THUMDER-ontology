import { ACLMessage, Performative } from "../ACLMessage"
import { Behaviour } from "../behaviours/Behaviour"

export abstract class ContractNetInitiator extends Behaviour {
    private readonly className: string
    private readonly cfp: ACLMessage

    protected constructor(taskName: string, cfp: ACLMessage) {
        super(taskName)
        this.className = ContractNetInitiator.name
        this.cfp = cfp
    }

    public getClassName(): string {
        return this.className
    }

    public getCFP(): ACLMessage {
        return this.cfp
    }

    public handleAllResponses(messages: ACLMessage[]): ACLMessage | null {
        for (const message of messages) {
            switch (message.getPerformative()) {
                case Performative.ACCEPT_PROPOSAL:
                    return this.handleAcceptProposal(message)
                case Performative.PROPOSE:
                    return this.handlePropose(message)
                case Performative.REFUSE:
                    return this.handleRefuse(message)
                case Performative.INFORM:
                    return this.handleInform(message)
                default:
                    console.log("Error")
                    break
            }
        }
        return null
    }

    public abstract handleAcceptProposal(propose: ACLMessage): null

    public abstract handlePropose(inform: ACLMessage): null

    public abstract handleRefuse(refuse: ACLMessage): null

    public abstract handleInform(inform: ACLMessage): null
}