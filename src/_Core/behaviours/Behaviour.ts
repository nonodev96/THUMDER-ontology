import { plainToClass } from "class-transformer";
import { Utils } from "../../Utils/Utils";
import ACLMessage from "../ACLMessage";

export default abstract class Behaviour {
  private readonly taskName: string;

  protected constructor(taskName: string) {
    this.taskName = taskName;
  }

  public getTaskName(): string {
    return this.taskName;
  }

  public handler(
    object: ACLMessage[] | ACLMessage | null
  ): Promise<ACLMessage | null> {
    return new Promise((resolve, reject) => {
      if (Utils.isArray(object)) {
        const messages = plainToClass(ACLMessage, <ACLMessage[]>object);
        resolve(this.handleAllResponses(messages));
      } else if (Utils.isObject(object) || object instanceof ACLMessage) {
        const messages = plainToClass(ACLMessage, <ACLMessage>object);
        resolve(this.handleAllResponses([messages]));
      } else {
        resolve(null);
      }
    });
  }

  public abstract handleAllResponses(messages: ACLMessage[]): ACLMessage | null;

  public getClassName(): string {
    return "Behaviour";
  }
}
