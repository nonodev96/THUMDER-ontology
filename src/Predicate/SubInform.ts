import { Predicate } from "../_Core/Predicate";
import { InfoCommunication, Instruction, StatusMachine } from "../Concept/InfoCommunication";

export class SubInform implements Predicate {
    log(): void {
    }

    toJSONString(): string {
        return {}.toString();
    }
}

export class IncidenceCommunication extends SubInform {
    private _communication: InfoCommunication;

    constructor(communication: InfoCommunication) {
        super();
        this._communication = communication;
    }

    get communication(): InfoCommunication {
        return this._communication;
    }

    set communication(value: InfoCommunication) {
        this._communication = value;
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

    toJSONString(): string {
        return {
            instruction: this.instruction,
            status_machine: this.statusMachine,
        }.toString();
    }


    log(): void {
        console.log(this.toJSONString())
    }
}
