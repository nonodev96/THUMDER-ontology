import { ACLMessage } from "../ACLMessage"
import { plainToClass } from "class-transformer"

export abstract class Behaviour {
    private readonly taskName: string

    protected constructor(taskName: string) {
        this.taskName = taskName
    }

    public getTaskName(): string{
        return this.taskName
    }

    public handler(object: any): Promise<ACLMessage | null> {
        return new Promise((resolve, reject) => {
            // const { allResponses } = object
            if (object instanceof Object) {
                const messages = plainToClass(ACLMessage, <ACLMessage>object)
                resolve(this.handleAllResponses([messages]))
            }
            if (object instanceof Array) {
                const messages = plainToClass(ACLMessage, <ACLMessage[]>object)
                resolve(this.handleAllResponses(messages))
            }
        })
    }

    public abstract handleAllResponses(messages: ACLMessage[]): ACLMessage | null

    public getClassName(): string {
        return "Behaviour"
    }
}