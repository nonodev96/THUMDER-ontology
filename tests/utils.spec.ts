import { Action, CreateFile, EditFile, FileManagerAction } from "../src";
import { plainToClass } from 'class-transformer';

describe("Check class-transformer", () => {

    test("Check FileManagerAction", () => {
        const fileManagerAction = new FileManagerAction('path/to/folder/');
        expect(fileManagerAction).toBeInstanceOf(FileManagerAction)
    });

    test("Check class->string->json->class", () => {
        const fileManagerAction = new FileManagerAction('/path/to/folder/');
        const fileManagerAction_string = JSON.stringify(fileManagerAction);
        const fileManagerAction_class = plainToClass(FileManagerAction, <FileManagerAction>JSON.parse(fileManagerAction_string));

        expect(fileManagerAction_class.getPath()).toEqual('/path/to/folder/')
    });

    test("Check class->string->json->class FileManagerAction", () => {
        const fileManager_array: { action: string, content: string }[] = []

        const fileManagerAction = new FileManagerAction('/path/to/folder');
        const fileManagerAction_string = JSON.stringify(fileManagerAction);
        fileManager_array.push({action: 'FileManagerAction', content: fileManagerAction_string})

        const createFileAction = new CreateFile('/path/to/folder', 'example_01.s');
        const createFileAction_string = JSON.stringify(createFileAction);
        fileManager_array.push({action: 'CreateFile', content: createFileAction_string})


        const editFileAction = new EditFile('/path/to/folder', '123456', ['Content']);
        const editFileAction_string = JSON.stringify(editFileAction);
        fileManager_array.push({action: 'EditFile', content: editFileAction_string})

        for (const {action, content} of fileManager_array) {
            switch (action) {
                case CreateFile.name:
                    let createFile_class: CreateFile = plainToClass(CreateFile, <CreateFile>JSON.parse(content));
                    expect(createFile_class.getNewFile()).toEqual('example_01.s')
                    break;
                case EditFile.name:
                    let editFile_class: EditFile = plainToClass(EditFile, <EditFile>JSON.parse(content));
                    expect(editFile_class.getContent()).toEqual(['Content'])
                    break;
                case FileManagerAction.name:
                    let fileManagerAction_class: FileManagerAction = plainToClass(FileManagerAction, <FileManagerAction>JSON.parse(content));
                    expect(fileManagerAction_class.getPath()).toEqual('/path/to/folder')
                    break;
                default:
                    expect(1).not.toEqual(1)
                    break;
            }
        }
    });

    test("Check class->serialize->send->deserialize->class CreateFile", () => {
        // Define the Action
        const fileManagerAction = new CreateFile('/path/to/folder', 'example_00.s');
        fileManagerAction.setNewFile('example_01.s')
        const fileManagerAction_string = JSON.stringify(fileManagerAction);

        // Serialize Action
        const aa = new Action();
        aa.setActionName("CreateFile")
        aa.setActionObject(fileManagerAction)
        aa.setActionContent(fileManagerAction_string)
        const content = JSON.stringify(aa)

        // send...

        // Deserialize to Action
        const action_class = plainToClass(Action, <Action>JSON.parse(content));

        switch (action_class.getActionName()) {
            case "CreateFile":
                const fileManagerAction_class = plainToClass(CreateFile, <CreateFile>JSON.parse(action_class.getActionContent()));
                expect(fileManagerAction_class.getNewFile()).toEqual('example_01.s')
                break;
            default:
                expect(1).not.toEqual(1)
                break;
        }
    });

});