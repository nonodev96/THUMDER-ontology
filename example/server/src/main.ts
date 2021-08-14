import { createServer } from "http";
import { Server } from "socket.io";
import { CoreAgents } from "../../../dist";
import { Task_CreateFile_RequestResponse, Task_CreateFolder_RequestResponse } from "./Tasks";

export const httpServer = createServer();
export const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("connection")
    console.log(socket.id)
    const coreAgents = new CoreAgents(socket);
    coreAgents.addTask(new Task_CreateFile_RequestResponse("Make-File"));
    coreAgents.addTask(new Task_CreateFolder_RequestResponse("Make-Folder"));
});

httpServer.listen(3000);