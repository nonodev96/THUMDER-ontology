import { ACLMessage, Performative } from "../ACLMessage"
import { Behaviour } from "../behaviours/Behaviour"

export abstract class ProposeResponder extends Behaviour {
    private readonly className: string

    protected constructor(taskName: string) {
        super(taskName)
        this.className = ProposeResponder.name
    }

    public getClassName(): string {
        return this.className
    }

    public handleAllResponses(messages: ACLMessage[]): ACLMessage | null {
        for (const message of messages) {
            switch (message.getPerformative()) {
                case Performative.PROPOSE:
                    return this.handlePropose(message)
                default:
                    console.log("Error")
                    break
            }
        }
        return null
    }

    public abstract handlePropose(request: ACLMessage): ACLMessage
}