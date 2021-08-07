import { Concept } from "../_Core/Concept";

export class InfoCommunication implements Concept {

}

/*
    AUTHENTICATE,
    STATUS_MACHINE,
    INSTRUCTION,
    FILE_MANAGER,
    FOLDER,
    FILE
*/

export class Authenticate extends InfoCommunication {

}

export class StatusMachine extends InfoCommunication {

}

export class Instruction extends InfoCommunication {
    private _line: number;
    private _content: string

    constructor(line: number, content: string) {
        super();
        this._line = line;
        this._content = content;
    }

    get line(): number {
        return this._line;
    }

    set line(value: number) {
        this._line = value;
    }

    get content(): string {
        return this._content;
    }

    set content(value: string) {
        this._content = value;
    }
}

export class FileManager extends InfoCommunication {

}