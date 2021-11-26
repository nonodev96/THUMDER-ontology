import { plainToClass } from "class-transformer";
import { Socket } from "socket.io";
import ACLMessage from "./ACLMessage";
import Behaviour from "./behaviours/Behaviour";
import AchieveREInitiator from "./proto/AchieveREInitiator";
import AchieveREResponder from "./proto/AchieveREResponder";
import ContractNetInitiator from "./proto/ContractNetInitiator";
import ContractNetResponder from "./proto/ContractNetResponder";
import ProposeInitiator from "./proto/ProposeInitiator";
import ProposeResponder from "./proto/ProposeResponder";
import Ontology from "./Ontology";
import { TaskContainer } from "../Utils/Types";

export default class CoreAgentsClient {
  public clientID;

  public clientSocket: Socket;

  private tasksMap: Map<string, Behaviour>;

  constructor(clientSocket: Socket) {
    this.clientSocket = clientSocket;
    this.clientID = clientSocket.id;
    this.tasksMap = new Map<string, Behaviour>();
    this.initEventListener();
  }

  /**
   * Add new task to handler and process
   * @param classHandler
   */
  public async addTask(classHandler: Behaviour): Promise<TaskContainer | any> {
    // console.log("add Task: ", classHandler.getTaskName(), " - ", classHandler.getClassName())
    let response: any;
    this.tasksMap.set(classHandler.getTaskName(), classHandler);
    switch (classHandler.getClassName()) {
      case AchieveREInitiator.name:
        response = await this.sendToServer(
          (<AchieveREInitiator>classHandler).getRequest()
        );
        return Promise.resolve(response);
      case AchieveREResponder.name:
        break;
      case ContractNetInitiator.name:
        response = await this.sendToServer(
          (<ContractNetInitiator>classHandler).getCFP()
        );
        return Promise.resolve(response);
      case ContractNetResponder.name:
      case ProposeInitiator.name:
        response = await this.sendToServer(
          (<ProposeInitiator>classHandler).getPropose()
        );
        return Promise.resolve(response);
      case ProposeResponder.name:
        break;
      default:
        return Promise.reject(new Error("Error default, task no defined"));
    }
    return Promise.reject(new Error("no classHandler"));
  }

  /**
   * Client send a message to server and await to response
   *
   * @param msg
   */
  public sendToServer(msg: ACLMessage): Promise<TaskContainer | any> {
    return new Promise<TaskContainer>((resolve, reject) => {
      this.clientSocket.emit(
        "messages",
        msg,
        async (response: TaskContainer) => {
          const classHandler = this.tasksMap.get(response.taskName);
          if (classHandler !== undefined) {
            const taskResolve = await classHandler.handler(response.message);
            const taskResolveDeleted = this.tasksMap.delete(response.taskName);
          } else {
            return Promise.reject(new Error("undefined - Task no response"));
          }
          // console.log('resolve', response, taskResolve, taskResolveDeleted)
          return Promise.resolve(response);
        }
      );
    });
  }

  /**
   * Client response to server
   *
   * @private
   */
  private initEventListener() {
    this.clientSocket.on("connect_error", (error: any) => {
      console.log("error", error);
      this.clientSocket.disconnect();
    });
    this.clientSocket.on("disconnect", (reason: any) => {
      console.log("disconnect", reason);
      this.clientSocket.disconnect();
    });
    this.clientSocket.on("connect", (_args: any) => {
      console.log("connect", this.clientSocket.id);
      this.clientID = this.clientSocket.id;
    });
    this.clientSocket.on(
      "messages",
      async (args: ACLMessage | ACLMessage[] | null, _callback: any) => {
        try {
          const message: ACLMessage = plainToClass(ACLMessage, args);
          const ontology: Ontology = plainToClass(
            Ontology,
            message.getOntology() as Ontology
          );
          const classHandler = this.tasksMap.get(ontology.getName());

          if (classHandler !== undefined) {
            const response = await classHandler.handler(args);
            // console.log("client process the response", response)
          } else {
            console.log("classHandler undefined");
          }
        } catch (e) {
          console.error(e);
        }
      }
    );
  }

  public disconnect() {
    this.clientSocket.disconnect();
  }
}
