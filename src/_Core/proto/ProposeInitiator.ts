import { ACLMessage, Performative } from "../ACLMessage"
import { Behaviour } from "../behaviours/Behaviour"

export abstract class ProposeInitiator extends Behaviour {
    private readonly className: string
    private readonly propose: ACLMessage

    protected constructor(taskName: string, propose: ACLMessage) {
        super(taskName)
        this.className = ProposeInitiator.name
        this.propose = propose
    }

    public getClassName(): string {
        return this.className
    }

    public getPropose(): ACLMessage {
        return this.propose
    }

    public handleAllResponses(messages: ACLMessage[]): ACLMessage | null {
        for (const message of messages) {
            switch (message.getPerformative()) {
                case Performative.ACCEPT_PROPOSAL:
                    return this.handleAcceptProposal(message)
                case Performative.REJECT_PROPOSAL:
                    return this.handleRejectProposal(message)
                case Performative.INFORM:
                    return this.handleInform(message)
            }
        }
        return null
    }

    public abstract handleAcceptProposal(msg: ACLMessage): null

    public abstract handleRejectProposal(msg: ACLMessage): null

    public abstract handleInform(msg: ACLMessage): null
}