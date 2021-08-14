import { ACLMessage, Performative } from "../ACLMessage"
import { Behaviour } from "../behaviours/Behaviour"

export abstract class AchieveREResponder extends Behaviour {
    private readonly className: string

    protected constructor() {
        super()
        this.className = AchieveREResponder.name
    }

    public getClassName(): string {
        return this.className
    }

    public handleAllResponses(messages: ACLMessage[]) {
        for (const message of messages) {
            switch (message.getPerformative()) {
                case Performative.REQUEST:
                    this.handleRequest(message)
                    break
                default:
                    console.log("Error")
                    break
            }
        }
    }

    public abstract handleRequest(request: ACLMessage): ACLMessage
}