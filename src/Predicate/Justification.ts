import Predicate from "../_Core/content/Predicate";
import { Reason, TypeCommunication } from "../Utils/Vocabulary";

export class Justification implements Predicate {
  private _typeCommunication: TypeCommunication;
  private _reason: Reason;

  constructor(typeCommunication: TypeCommunication, reason: Reason) {
    this._typeCommunication = typeCommunication;
    this._reason = reason;
  }

  get typeCommunication(): TypeCommunication {
    return this._typeCommunication;
  }

  set typeCommunication(value: TypeCommunication) {
    this._typeCommunication = value;
  }

  get reason(): Reason {
    return this._reason;
  }

  set reason(value: Reason) {
    this._reason = value;
  }

  public toString(): string {
    return {
      type_communication: this.typeCommunication,
      reason: this.reason,
    }.toString();
  }
}
