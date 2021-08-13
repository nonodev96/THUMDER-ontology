import { Action } from "../Action";
import { ACLMessage, Performative } from "../ACLMessage";
import { Behaviour } from "../behaviours/Behaviour";
import { plainToClass } from "class-transformer";

export class AchieveREInitiator extends Behaviour {

    private readonly className: string;
    private readonly message: ACLMessage;

    constructor(message: ACLMessage) {
        super();
        this.className = AchieveREInitiator.name;
        this.message = message
    }

    public getClassName(): string {
        return this.className
    }

    handler(object: any): Promise<any> {
        // const { allResponses } = object;
        const action = plainToClass(Action, <Action>object);
        const messages = plainToClass(ACLMessage, <ACLMessage[]>action.getActionObject())
        this.handleAllResponses(messages);

        return new Promise((resolve, reject) => {
            resolve(true)
        })
    }

    handleAllResponses(responses: ACLMessage[]): void {
        for (const message of responses) {
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

    handleAllResultNotifications(resultNotifications: ACLMessage[]): void {

    }

    handleOutOfSequence(msg: ACLMessage): void {

    }

    handleAgree(agree: ACLMessage): void {

    }

    handleRefuse(refuse: ACLMessage): void {

    }

    handleInform(inform: ACLMessage): void {

    }
}