import { plainToClass } from "class-transformer";
import {
  Performative,
  AchieveREResponder,
  ACLMessage,
  CreateFile,
  ModifyFile,
  FileManagerStatus,
} from "../../../dist";

export class Task_CreateFile_RequestResponse extends AchieveREResponder {
  constructor(taskName: string) {
    super(taskName);
  }

  handleRequest(request: ACLMessage): ACLMessage {
    console.log(
      "Task_CreateFile_RequestResponse handleRequest",
      this.getTaskName()
    );
    const createFile = plainToClass(
      CreateFile,
      <CreateFile>JSON.parse(request.getContent())
    );
    console.log(createFile);

    const message_reply = request.createReply();
    message_reply.setPerformative(Performative.AGREE);
    message_reply.setContent(JSON.stringify(new FileManagerStatus("ok")));
    return message_reply;
  }
}

export class Task_CreateFolder_RequestResponse extends AchieveREResponder {
  constructor(taskName: string) {
    super(taskName);
  }

  handleRequest(request: ACLMessage): ACLMessage {
    console.log(
      "Task_CreateFolder_RequestResponse handleRequest",
      this.getTaskName()
    );
    const message_reply = request.createReply();
    message_reply.setPerformative(Performative.AGREE);
    return message_reply;
  }
}

export class Task_ModifyFile_RequestResponse extends AchieveREResponder {
  constructor(taskName: string) {
    super(taskName);
  }

  handleRequest(request: ACLMessage): ACLMessage {
    console.log(
      "Task_ModifyFile_RequestResponse handleRequest",
      this.getTaskName()
    );
    const modifyFile = plainToClass(
      ModifyFile,
      <ModifyFile>JSON.parse(request.getContent())
    );
    console.log(modifyFile);
    const message_reply = request.createReply();
    message_reply.setPerformative(Performative.AGREE);
    return message_reply;
  }
}

export class Task_InterpreterFileDLX_RequestResponse extends AchieveREResponder {
  constructor(taskName: string) {
    super(taskName);
  }

  handleRequest(request: ACLMessage): ACLMessage {
    console.log(
      "Task_InterpreterFileDLX_RequestResponse handleRequest",
      this.getTaskName()
    );
    const modifyFile = plainToClass(
      ModifyFile,
      <ModifyFile>JSON.parse(request.getContent())
    );
    console.log(modifyFile);
    const message_reply = request.createReply();
    message_reply.setPerformative(Performative.AGREE);
    return message_reply;
  }
}
