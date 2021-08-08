import { Predicate } from "../_Core/Predicate";
import { Instruction } from "../Concept/Instruction";
import { StatusMachine } from "../Concept/StatusMachine";
import { Incidence } from "../Utils/Vocabulary";

export abstract class SubInform implements Predicate {
}

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

    get instruction(): Instruction {
        return this._instruction;
    }

    set instruction(value: Instruction) {
        this._instruction = value;
    }

    get statusMachine(): StatusMachine {
        return this._statusMachine;
    }

    set statusMachine(value: StatusMachine) {
        this._statusMachine = value;
    }

    toString(): string {
        return {
            instruction: this.instruction,
            status_machine: this.statusMachine,
        }.toString();
    }


}
