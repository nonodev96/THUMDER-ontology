import Concept from "../_Core/content/Concept";

export default class Instruction extends Concept {
  private _line: number;

  private _content: string;

  constructor(line: number, content: string) {
    super();
    this._line = line;
    this._content = content;
  }

  public getLine(): number {
    return this._line;
  }

  public setLine(value: number) {
    this._line = value;
  }

  public getContent(): string {
    return this._content;
  }

  public setContent(value: string) {
    this._content = value;
  }

  public toString(): string {
    return {
      line: this._line,
      content: this._content,
    }.toString();
  }
}
