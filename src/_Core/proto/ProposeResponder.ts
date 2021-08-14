import { ACLMessage } from "../ACLMessage"
import { Behaviour } from "../behaviours/Behaviour"

export abstract class ProposeResponder extends Behaviour {
    private readonly className: string

    protected constructor() {
        super()
        this.className = ProposeResponder.name
    }

    public getClassName(): string {
        return this.className
    }


    public abstract prepareResponse(propose: ACLMessage): ACLMessage
}