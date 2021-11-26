import Predicate from "../_Core/content/Predicate";

export default class FileManagerStatus extends Predicate {
  public status: string;

  constructor(status: string) {
    super();
    this.status = status;
  }

  public toString(): string {
    return {
      status: this.status,
    }.toString();
  }
}
