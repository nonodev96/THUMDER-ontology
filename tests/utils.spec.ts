import { Action, CreateFile, FileManagerAction } from "../src";
import { plainToClass } from 'class-transformer';

describe("Check class-transformer", () => {

    test("Check FileManagerAction", () => {
        const fileManagerAction = new FileManagerAction('path/to/folder/', 'tests/');
        expect(fileManagerAction).toBeInstanceOf(FileManagerAction)
    });

    test("Check class->string->json->class", () => {
        const fileManagerAction = new FileManagerAction('path/to/folder/', 'tests/');
        fileManagerAction.setFolderName('tests_01/')
        const fileManagerAction_string = JSON.stringify(fileManagerAction);
        const fileManagerAction_class = plainToClass(FileManagerAction, <FileManagerAction>JSON.parse(fileManagerAction_string));

        expect(fileManagerAction_class.getFolderName()).toEqual('tests_01/')
    });

    test("Check class->string->json->class FileManagerAction", () => {
        const fileManagerAction = new FileManagerAction('path/to/folder', 'tests/');
        const fileManagerAction_string = JSON.stringify(fileManagerAction);
        let fileManagerAction_class;

        switch (fileManagerAction.constructor) {
            case CreateFile:
                fileManagerAction_class = plainToClass(CreateFile, <CreateFile>JSON.parse(fileManagerAction_string));
                expect(fileManagerAction_class.getNewFile()).toEqual('example_01.s')
                break;
            case FileManagerAction:
                fileManagerAction_class = plainToClass(FileManagerAction, <FileManagerAction>JSON.parse(fileManagerAction_string));
                expect(fileManagerAction_class.getFolderName()).toEqual('tests/')
                break;
            default:
                expect(1).not.toEqual(1)
                break;
        }
    });

    test("Check class->serialize->send->deserialize->class CreateFile", () => {
        // Define the Action
        const fileManagerAction = new CreateFile('path/to/folder', 'tests/', 'example_00.s');
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