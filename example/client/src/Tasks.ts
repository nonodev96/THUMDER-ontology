import { Performative, AchieveREInitiator, ACLMessage } from "../../../dist";

export class Task_RequestInitiator extends AchieveREInitiator {

    constructor(message: ACLMessage) {
        super(message)
        console.log("Task_RequestInitiator")
    }

    handleAllResponses(responses: ACLMessage[]): void {
        console.log('Task_Request handleAllResponses')
        for (const response of responses) {
            switch (response.getPerformative()) {
                case Performative.AGREE:
                    this.handleAgree(response)
                    break
                case Performative.REFUSE:
                    this.handleRefuse(response)
                    break
                case Performative.INFORM:
                    this.handleInform(response)
                    break
            }
        }
    }

    handleAgree(agree: ACLMessage): void {
        console.log("handleAgree")
    }

    handleRefuse(refuse: ACLMessage): void {
        console.log("handleRefuse")
    }

    handleInform(inform: ACLMessage): void {
        console.log("handleInform")
    }
}