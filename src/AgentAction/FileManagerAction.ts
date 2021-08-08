import { AgentAction } from "../_Core/AgentAction";
import { Md5 } from "md5-typescript";

export class FileManagerAction implements AgentAction {

    private path: string;
    private folderName: string;
    private filename: string;

    constructor(path: string, folderName: string) {
        this.path = path;
        this.folderName = folderName;
        this.filename = "";
    }

    public getPath(): string {
        return this.path;
    }

    public setPath(value: string) {
        this.path = value;
    }

    public getFolderName(): string {
        return this.folderName;
    }

    public setFolderName(value: string) {
        this.folderName = value;
    }

    public getFilename(): string {
        return this.filename;
    }

    public setFilename(value: string) {
        this.filename = value;
    }
}

export class CreateFolder extends FileManagerAction {
    private newFolder: string;

    constructor(path: string, folderName: string, newFolder: string) {
        super(path, folderName);
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

    constructor(path: string, folderName: string, newFile: string) {
        super(path, folderName);
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

    constructor(path: string, folderName: string, newFolderName: string) {
        super(path, folderName);
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
    private oldFileName: string;
    private newFileName?: string | null;
    private content?: string | null;
    private md5?: string | null;

    constructor(path: string, folderName: string, oldFileName: string) {
        super(path, folderName);
        this.oldFileName = oldFileName;
        this.newFileName = null;
        this.content = null;
    }

    public getOldFileName(): string {
        return this.oldFileName;
    }

    public setOldFileName(value: string) {
        this.oldFileName = value;
    }

    public getNewFileName(): string {
        return <string>this.newFileName;
    }

    public setNewFileName(value: string) {
        this.newFileName = value;
    }

    public getContent(): string {
        return <string>this.content;
    }

    public setContent(value: string) {
        this.md5 = Md5.init(value);
        this.content = value;
    }

    public getMD5(): string {
        return <string>this.md5;
    }
}

export class DeleteFolder extends FileManagerAction {
    private folderNameToDelete: string;

    constructor(path: string, folderName: string, folderNameToDelete: string) {
        super(path, folderName);
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

    constructor(path: string, folderName: string, fileNameToDelete: string) {
        super(path, folderName);
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

    constructor(path: string, folderName: string, folderNameToShow: string) {
        super(path, folderName);
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

    constructor(path: string, folderName: string, fileNameToShow: string) {
        super(path, folderName);
        this.fileNameToShow = fileNameToShow;
    }

    public getFileNameToShow(): string {
        return this.fileNameToShow;
    }

    public setFileNameToShow(value: string) {
        this.fileNameToShow = value;
    }
}
