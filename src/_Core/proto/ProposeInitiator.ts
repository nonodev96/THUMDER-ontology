import { ACLMessage, Performative } from "../ACLMessage"
import { Behaviour } from "../behaviours/Behaviour"

export abstract class ProposeInitiator extends Behaviour {
    private readonly className: string
    private readonly message: ACLMessage

    protected constructor(message: ACLMessage) {
        super()
        this.className = ProposeInitiator.name
        this.message = message
    }

    public getClassName(): string {
        return this.className
    }

    public getMessage(): ACLMessage {
        return this.message
    }

    public handleAllResponses(messages: ACLMessage[]): void {
        for (const message of messages) {
            switch (message.getPerformative()) {
                case Performative.ACCEPT_PROPOSAL:
                    this.handleAcceptProposal(message)
                    break
                case Performative.REJECT_PROPOSAL:
                    this.handleRejectProposal(message)
                    break
            }
        }
    }

    public abstract handleAcceptProposal(msg: ACLMessage): void

    public abstract handleRejectProposal(msg: ACLMessage): void
}