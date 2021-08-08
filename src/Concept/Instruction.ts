import { Concept } from "../_Core/Concept";

export class Instruction extends Concept {
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


    toString(): string {
        return {
            line: this._line,
            content: this._content,
        }.toString();
    }
}