import { Md5 } from "md5-typescript";
import Predicate from "../_Core/content/Predicate";

export default class AcceptSimulation implements Predicate {
  private _md5: string;

  private _filename: string;

  private _content: string;

  constructor(filename: string, content: string) {
    this._filename = filename;
    this._content = content;
    this._md5 = Md5.init(content);
  }

  get filename(): string {
    return this._filename;
  }

  set filename(value: string) {
    this._filename = value;
  }

  get content(): string {
    return this._content;
  }

  // When you change de content of file the hash change
  set content(value: string) {
    this._md5 = Md5.init(value);
    this._content = value;
  }

  toString(): string {
    return {
      md5: this._md5,
      filename: this._filename,
      content: this._content,
    }.toString();
  }
}
