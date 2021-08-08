import { Concept } from "../_Core/Concept";

export class FileManager implements Concept {

    path: string;
    filename: string;
    files: File[]

    constructor() {
        this.path = "";
        this.filename = "";
        this.files = [];
    }

}