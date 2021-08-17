import { Socket } from "socket.io"
import { ACLMessage } from "./ACLMessage"
import { Behaviour } from "./behaviours/Behaviour"
import { AchieveREInitiator } from "./proto/AchieveREInitiator"
import { AchieveREResponder } from "./proto/AchieveREResponder"
import { ContractNetInitiator } from "./proto/ContractNetInitiator"
import { ContractNetResponder } from "./proto/ContractNetResponder"
import { ProposeInitiator } from "./proto/ProposeInitiator"
import { ProposeResponder } from "./proto/ProposeResponder"
import { plainToClass } from "class-transformer";
import { Ontology } from "./Ontology";


export class CoreAgentsServer {
    public serverID

    private readonly weak: Map<string, Behaviour>

    private socketsClientMap: Map<string, Socket>
    private serverSocket: Socket;

    constructor(serverSocket: Socket) {
        this.serverSocket = serverSocket
        this.serverID = serverSocket !== null ? serverSocket.id : 0

        this.weak = new Map<string, Behaviour>()
        this.socketsClientMap = new Map<string, Socket>()
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
                // this.sendToServer((<AchieveREInitiator>classHandler).getRequest())
                break;
            case AchieveREResponder.name:

                break;
            case ContractNetInitiator.name:
                // this.sendToServer((<ContractNetInitiator>classHandler).getCFP())
                break;
            case ContractNetResponder.name:

                break;
            case ProposeInitiator.name:
                // this.sendToServer((<ProposeInitiator>classHandler).getPropose())
                break;
            case ProposeResponder.name:

                break;
        }
    }


    /**
     * Process the ACLMessages of clients and response to client
     */
    public addNewSocket(socket: Socket) {
        this.socketsClientMap.set(socket.id, socket)

        socket.on("messages", async (args, callback) => {
            try {
                const message = plainToClass(ACLMessage, <ACLMessage>args)
                const ontology = plainToClass(Ontology, <Ontology>message.getOntology())
                const classHandler = this.weak.get(ontology.getName())

                if (classHandler !== undefined) {
                    const response = await classHandler.handler(args)
                    if (response !== null) {
                        // response -> replyTo
                        // console.log("args: ", args)
                        // console.log("typeof callback: ", typeof callback)
                        if (typeof callback === "function") {
                            callback(response)
                        }

                    }
                } else {
                    console.log("classHandler undefined")
                }

            } catch (e) {
                console.error(e)
            }
        })
    }

    public deleteSocket(id: string) {
        this.socketsClientMap.delete(id)
    }

    public disconnect() {
        this.serverSocket.disconnect()
    }
}