import ACLMessage, { Performative } from "../ACLMessage";
import Behaviour from "../behaviours/Behaviour";

export default abstract class AchieveREResponder extends Behaviour {
  private readonly className: string;

  protected constructor(taskName: string) {
    super(taskName);
    this.className = AchieveREResponder.name;
  }

  public getClassName(): string {
    return this.className;
  }

  public handleAllResponses(messages: ACLMessage[]): ACLMessage | null {
    for (const message of messages) {
      switch (message.getPerformative()) {
        case Performative.REQUEST:
          return this.handleRequest(message);
        default:
          console.log("Error");
          break;
      }
    }
    return null;
  }

  public abstract handleRequest(request: ACLMessage): ACLMessage;
}
