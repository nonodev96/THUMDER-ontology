import ACLMessage, { Performative } from "../ACLMessage";
import Behaviour from "../behaviours/Behaviour";

export default abstract class AchieveREInitiator extends Behaviour {
  private readonly className: string;

  private readonly request: ACLMessage;

  protected constructor(taskName: string, request: ACLMessage) {
    super(taskName);
    this.className = AchieveREInitiator.name;
    this.request = request;
  }

  public getClassName(): string {
    return this.className;
  }

  public getRequest(): ACLMessage {
    return this.request;
  }

  public handleAllResponses(messages: ACLMessage[]): ACLMessage | null {
    for (const message of messages) {
      switch (message.getPerformative()) {
        case Performative.AGREE:
          return this.handleAgree(message);
        case Performative.REFUSE:
          return this.handleRefuse(message);
        case Performative.INFORM:
          return this.handleInform(message);
        default:
          console.log("Error");
          break;
      }
    }
    return null;
  }

  abstract handleAgree(agree: ACLMessage): any;

  abstract handleRefuse(refuse: ACLMessage): any;

  abstract handleInform(inform: ACLMessage): any;
}
