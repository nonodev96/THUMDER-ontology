import { Socket } from "socket.io";
import { plainToClass } from "class-transformer";
import { ACLMessage } from "./ACLMessage";
import { Behaviour } from "./behaviours/Behaviour";
import { AchieveREInitiator } from "./proto/AchieveREInitiator";
import { AchieveREResponder } from "./proto/AchieveREResponder";
import { ContractNetInitiator } from "./proto/ContractNetInitiator";
import { ContractNetResponder } from "./proto/ContractNetResponder";
import { ProposeInitiator } from "./proto/ProposeInitiator";
import { ProposeResponder } from "./proto/ProposeResponder";
import { Ontology } from "./Ontology";
import { TaskContainer } from "../Utils/Types";


export class CoreAgentsClient {
    public clientID
    private tasksMap: Map<string, Behaviour>
    public clientSocket: Socket;

    constructor(clientSocket: Socket) {
        this.clientSocket = clientSocket
        this.clientID = clientSocket.id
        this.tasksMap = new Map<string, Behaviour>()
        this.initEventListener()
    }

    /**
     * Add new task to handler and process
     * @param classHandler
     */
    public async addTask(classHandler: Behaviour): Promise<TaskContainer> {
        // console.log("add Task: ", classHandler.getTaskName(), " - ", classHandler.getClassName())
        return new Promise(async (resolve, reject) => {
            let response: any
            this.tasksMap.set(classHandler.getTaskName(), classHandler)
            switch (classHandler.getClassName()) {
                case AchieveREInitiator.name:
                    response = await this.sendToServer((<AchieveREInitiator>classHandler).getRequest())
                    resolve(response)
                    break;
                case AchieveREResponder.name:

                    break;
                case ContractNetInitiator.name:
                    response = await this.sendToServer((<ContractNetInitiator>classHandler).getCFP())
                    resolve(response)
                    break;
                case ContractNetResponder.name:

                    break;
                case ProposeInitiator.name:
                    response = await this.sendToServer((<ProposeInitiator>classHandler).getPropose())
                    resolve(response)
                    break;
                case ProposeResponder.name:

                    break;
                default:
                    reject("Error default, task no defined")
                    break;
            }
        })
    }

    /**
     * Client send a message to server and await to response
     *
     * @param msg
     */
    public sendToServer(msg: ACLMessage): Promise<TaskContainer> {
        return new Promise<TaskContainer>((resolve, reject) => {
            this.clientSocket.emit("messages", msg, async (response: TaskContainer) => {

                const classHandler = this.tasksMap.get(response.taskName)
                let taskResolve, taskResolveDeleted
                if (classHandler !== undefined) {
                    taskResolve = await classHandler.handler(response.message)
                    taskResolveDeleted = this.tasksMap.delete(response.taskName)
                } else {
                    reject("classHandler undefined - Task no response")
                }

                // console.log('resolve', response, taskResolve, taskResolveDeleted)
                resolve(response)
            })
        })
    }


    /**
     * Client response to server
     *
     * @private
     */
    private initEventListener() {

        this.clientSocket.on("connect_error", (error) => {
            console.log('error', error)
            this.clientSocket.disconnect()
        })

        this.clientSocket.on("disconnect", (reason) => {
            console.log('disconnect', reason)
            this.clientSocket.disconnect()
        })

        this.clientSocket.on("connect", (args) => {
            console.log('connect', this.clientSocket.id)
            this.clientID = this.clientSocket.id
        })

        this.clientSocket.on("messages", async (args, callback) => {
            try {
                const message = plainToClass(ACLMessage, <ACLMessage>args)
                const ontology = plainToClass(Ontology, <Ontology>message.getOntology())
                const classHandler = this.tasksMap.get(ontology.getName())

                if (classHandler !== undefined) {
                    const response = await classHandler.handler(args)
                    // console.log("client process the response", response)
                } else {
                    console.log("classHandler undefined")
                }
            } catch (e) {
                console.error(e)
            }
        })
    }


    public disconnect() {
        this.clientSocket.disconnect()
    }
}