import { Predicate } from "../_Core/content/Predicate";

export abstract class SendInstruction extends Predicate {
    public toString(): string {
        return {}.toString();
    }
}

export class SendInstructionExecute extends SendInstruction {

}


export class SendInstructionDebug extends SendInstruction {

}