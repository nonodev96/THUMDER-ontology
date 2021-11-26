import { createServer } from "http";
import { Server } from "socket.io";
import ConsoleManager from "./ConsoleManager";
import { CoreAgentsServer } from "../../../dist";
import {
  Task_CreateFile_RequestResponse,
  Task_CreateFolder_RequestResponse,
  Task_ModifyFile_RequestResponse,
  Task_InterpreterFileDLX_RequestResponse,
} from "./Tasks";

export const httpServer = createServer();
export const server = new Server(httpServer);

export const delay = (ms: number) => {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
};
export const consoleManager = new ConsoleManager(<any>server);
export const coreAgentsServer = new CoreAgentsServer(<any>server);
coreAgentsServer.addTask(new Task_CreateFile_RequestResponse("Make-File"));
coreAgentsServer.addTask(new Task_CreateFolder_RequestResponse("Make-Folder"));
coreAgentsServer.addTask(new Task_ModifyFile_RequestResponse("Modify-File"));
coreAgentsServer.addTask(
  new Task_InterpreterFileDLX_RequestResponse("Interpreter-File")
);

server.on("connection", (socket) => {
  console.log("Connection new Socket", socket.id);

  socket.on("disconnect", (args) => {
    console.log("disconnect", args);
    coreAgentsServer.deleteSocket(socket.id);
    consoleManager.deleteSocket(socket.id);
  });

  coreAgentsServer.addNewSocket(socket);
  consoleManager.addSocket(socket);
});

httpServer.listen(3000);

const start = async () => {
  await delay(5000);
  consoleManager.init().then(() => {
    console.log("End");
  });
};

start().then((r) => {});
