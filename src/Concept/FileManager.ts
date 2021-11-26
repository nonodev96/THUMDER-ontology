import Concept from "../_Core/content/Concept";

export default class FileManager implements Concept {
  public path: string;

  public filename: string;

  public files: File[];

  constructor() {
    this.path = "";
    this.filename = "";
    this.files = [];
  }
}
