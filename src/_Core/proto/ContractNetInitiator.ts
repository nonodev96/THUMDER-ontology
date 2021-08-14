import { ACLMessage, Performative } from "../ACLMessage"
import { Behaviour } from "../behaviours/Behaviour"

export abstract class ContractNetInitiator extends Behaviour {
    private readonly className: string

    protected constructor() {
        super()
        this.className = ContractNetInitiator.name
    }

    public getClassName(): string {
        return this.className
    }

    public handleAllResponses(messages: ACLMessage[]): void {
        for (const message of messages) {
            switch (message.getPerformative()) {
                case Performative.ACCEPT_PROPOSAL:
                    this.handleAcceptProposal(message)
                    break
                case Performative.PROPOSE:
                    this.handlePropose(message)
                    break
                case Performative.REFUSE:
                    this.handleRefuse(message)
                    break
                case Performative.INFORM:
                    this.handleInform(message)
                    break
            }
        }
    }

    public abstract handleAcceptProposal(propose: ACLMessage): void

    public abstract handlePropose(inform: ACLMessage): void

    public abstract handleRefuse(refuse: ACLMessage): void

    public abstract handleInform(inform: ACLMessage): void
}