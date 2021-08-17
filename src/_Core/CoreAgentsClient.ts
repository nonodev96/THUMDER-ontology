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


export class CoreAgentsClient {
    public clientID

    private readonly weak: Map<string, Behaviour>

    public clientSocket: Socket;

    constructor(clientSocket: Socket) {
        this.clientSocket = clientSocket
        this.clientID = clientSocket.id

        this.weak = new Map<string, Behaviour>()
        this.initEventListener()
    }

    /**
     * Add new task to handler and process
     * @param classHandler
     */
    public async addTask(classHandler: Behaviour): Promise<any> {
        // read the task name
        console.log("add Task: ", classHandler.getTaskName(), " - ", classHandler.getClassName())
        return new Promise(async (resolve, reject) => {

            let response: any

            this.weak.set(classHandler.getTaskName(), classHandler)
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
    public sendToServer(msg: ACLMessage): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.clientSocket.emit("messages", msg, (response: any) => {
                console.log('resolve', response)
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
        this.clientSocket.on("tests", async (args, callback) => {
            console.log(args)
            callback({client: 'Hello World'})
        })
        this.clientSocket.on("messages", async (args, callback) => {
            try {
                const message = plainToClass(ACLMessage, <ACLMessage>args)
                const ontology = plainToClass(Ontology, <Ontology>message.getOntology())
                const classHandler = this.weak.get(ontology.getName())

                if (classHandler !== undefined) {
                    const response = await classHandler.handler(args)
                    console.log("client process the response", response)
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