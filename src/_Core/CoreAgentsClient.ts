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
    public addTask(classHandler: Behaviour) {
        // read the task name
        console.log("add Task: ", classHandler.getTaskName(), " - ", classHandler.getClassName())

        this.weak.set(classHandler.getTaskName(), classHandler)
        switch (classHandler.getClassName()) {
            case AchieveREInitiator.name:
                this.sendToServer((<AchieveREInitiator>classHandler).getRequest())
                break;
            case AchieveREResponder.name:

                break;
            case ContractNetInitiator.name:
                this.sendToServer((<ContractNetInitiator>classHandler).getCFP())
                break;
            case ContractNetResponder.name:

                break;
            case ProposeInitiator.name:
                this.sendToServer((<ProposeInitiator>classHandler).getPropose())
                break;
            case ProposeResponder.name:

                break;
        }
    }

    public sendToServer(msg: ACLMessage) {
        console.log("sendToServer")
        this.clientSocket.emit("messages", msg)
    }

    private initEventListener() {
        this.clientSocket.on("messages", async (args) => {
            try {
                const message = plainToClass(ACLMessage, <ACLMessage>args)
                const ontology = plainToClass(Ontology, <Ontology>message.getOntology())
                console.log(this.weak.get(ontology.getName()))
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