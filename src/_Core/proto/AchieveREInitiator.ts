import { ACLMessage, Performative } from "../ACLMessage"
import { Behaviour } from "../behaviours/Behaviour"
import { plainToClass } from "class-transformer"

export abstract class AchieveREInitiator extends Behaviour {
    private readonly className: string
    private readonly message: ACLMessage

    protected constructor(message: ACLMessage) {
        super()
        this.className = AchieveREInitiator.name
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
                case Performative.AGREE:
                    this.handleAgree(message)
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

    abstract handleAgree(agree: ACLMessage): void

    abstract handleRefuse(refuse: ACLMessage): void

    abstract handleInform(inform: ACLMessage): void
}