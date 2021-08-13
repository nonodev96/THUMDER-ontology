import { ACLMessage, Performative } from "../ACLMessage";
import { Behaviour } from "../behaviours/Behaviour";
import { plainToClass } from "class-transformer";
import { Action } from "../Action";

export abstract class AchieveREResponder extends Behaviour {

    private readonly className: string;

    protected constructor() {
        super();
        this.className = AchieveREResponder.name;
    }

    public getClassName(): string {
        return this.className
    }

    public handler(object: any): Promise<any> {
        const action = plainToClass(Action, <Action>object);
        const message = plainToClass(ACLMessage, <ACLMessage>action.getActionObject())
        this.handleRequest(message)

        return new Promise((resolve, reject) => {
            resolve(true)
        })
    }

    public abstract handleRequest(request: ACLMessage): ACLMessage;

    public abstract prepareResultNotification(request: ACLMessage, response: ACLMessage): ACLMessage;
}