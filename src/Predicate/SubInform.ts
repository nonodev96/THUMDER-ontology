import Predicate from "../_Core/content/Predicate";
import Instruction from "../Concept/Instruction";
import StatusMachine from "../Concept/StatusMachine";
import { Incidence } from "../Utils/Vocabulary";

export abstract class SubInform implements Predicate {}

export class IncidenceCommunication extends SubInform {
  private detail: Incidence;

  constructor(detail: Incidence) {
    super();
    this.detail = detail;
  }
}

export class ResultInstruction extends SubInform {
  private _instruction: Instruction;

  private _statusMachine: StatusMachine;

  constructor(instruction: Instruction, statusMachine: StatusMachine) {
    super();
    this._instruction = instruction;
    this._statusMachine = statusMachine;
  }

  public getInstruction(): Instruction {
    return this._instruction;
  }

  public setInstruction(value: Instruction) {
    this._instruction = value;
  }

  public getStatusMachine(): StatusMachine {
    return this._statusMachine;
  }

  public setStatusMachine(value: StatusMachine) {
    this._statusMachine = value;
  }

  public toString(): string {
    return {
      instruction: this._instruction,
      status_machine: this._statusMachine,
    }.toString();
  }
}
