import { ACLMessage } from "../ACLMessage"
import { plainToClass } from "class-transformer"

export abstract class Behaviour {

    public handler(object: any): void {
        // const { allResponses } = object
        if (object instanceof Object) {
            const messages = plainToClass(ACLMessage, <ACLMessage>object)
            this.handleAllResponses([messages])
        }
        if (object instanceof Array) {
            const messages = plainToClass(ACLMessage, <ACLMessage[]>object)
            this.handleAllResponses(messages)
        }
    }

    public abstract handleAllResponses(messages: ACLMessage[]): void

    public abstract getMessage(): ACLMessage

    // TODO
    public abstract getResponse(): Promise<ACLMessage>

    public getClassName(): string {
        return "Behaviour"
    }
}