import { AgentAction } from "../_Core/content/AgentAction";
import { Md5 } from "md5-typescript";

export class FileManagerAction implements AgentAction {
    private path: string;
    private md5?: string | null;
    public key?: string | null;

    constructor(path: string) {
        this.path = path;
    }

    public getPath(): string {
        return this.path;
    }

    public setPath(value: string) {
        this.path = value;
    }

    // Uuid --> File and folder key
    public setKey(value: string) {
        this.key = value;
    }

    public getKey(): string {
        return <string>this.key;
    }

    // MD5 -> File content
    public setMD5(value: string) {
        this.md5 = value;
    }

    public getMD5(): string {
        return <string>this.md5;
    }
}

export class CreateFolder extends FileManagerAction {
    private newFolder: string;

    constructor(path: string, newFolder: string) {
        super(path);
        this.newFolder = newFolder;
    }

    public getNewFolder(): string {
        return this.newFolder;
    }

    public setNewFolder(value: string) {
        this.newFolder = value;
    }
}

export class CreateFile extends FileManagerAction {
    private newFile: string;

    constructor(path: string, newFile: string) {
        super(path);
        this.newFile = newFile;
    }

    public getNewFile(): string {
        return this.newFile;
    }

    public setNewFile(value: string) {
        this.newFile = value;
    }
}

export class ModifyFolder extends FileManagerAction {
    private newFolderName: string;

    constructor(path: string, key: string, newFolderName: string) {
        super(path);
        this.key = key;
        this.newFolderName = newFolderName;
    }

    public getNewFolderName(): string {
        return this.newFolderName;
    }

    public setNewFolderName(value: string) {
        this.newFolderName = value;
    }
}

export class ModifyFile extends FileManagerAction {
    private newFileName: string;

    constructor(path: string, key: string, newFileName: string) {
        super(path);
        this.key = key;
        this.newFileName = newFileName;
    }

    public getNewFileName(): string {
        return this.newFileName;
    }

    public setNewFileName(value: string) {
        this.newFileName = value;
    }
}

export class EditFile extends FileManagerAction {
    private content: string[];

    constructor(path: string, key: string, content: string[]) {
        super(path);
        this.key = key;
        this.content = content;
    }

    public getContent(): string[] {
        return this.content;
    }

    public setContent(value: string[]) {
        this.setMD5(Md5.init(value.toString()));
        this.content = value;
    }
}

export class DeleteFolder extends FileManagerAction {
    private folderNameToDelete: string;

    constructor(path: string, key: string, folderNameToDelete: string) {
        super(path);
        this.key = key;
        this.folderNameToDelete = folderNameToDelete;
    }

    public getFolderNameToDelete(): string {
        return this.folderNameToDelete;
    }

    public setFolderNameToDelete(value: string) {
        this.folderNameToDelete = value;
    }
}

export class DeleteFile extends FileManagerAction {
    private fileNameToDelete: string;

    constructor(path: string, key: string, fileNameToDelete: string) {
        super(path);
        this.key = key;
        this.fileNameToDelete = fileNameToDelete;
    }

    public getFileNameToDelete(): string {
        return this.fileNameToDelete;
    }

    public setFileNameToDelete(value: string) {
        this.fileNameToDelete = value;
    }
}

export class ShowFolder extends FileManagerAction {
    private folderNameToShow: string;

    constructor(path: string, key: string, folderNameToShow: string) {
        super(path);
        this.key = key;
        this.folderNameToShow = folderNameToShow;
    }

    public getFolderNameToShow(): string {
        return this.folderNameToShow;
    }

    public setFolderNameToShow(value: string) {
        this.folderNameToShow = value;
    }
}

export class ShowFile extends FileManagerAction {
    private fileNameToShow: string;

    constructor(path: string, key: string, fileNameToShow: string) {
        super(path);
        this.key = key;
        this.fileNameToShow = fileNameToShow;
    }

    public getFileNameToShow(): string {
        return this.fileNameToShow;
    }

    public setFileNameToShow(value: string) {
        this.fileNameToShow = value;
    }
}
