import { Socket } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
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


export class CoreAgents {
    private socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
    public readonly id: string
    private readonly weak: Map<string, Behaviour>

    constructor(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) {
        this.socket = socket
        this.id = socket.id
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
        this.socket.emit("messages", msg)
    }

    public sendMultiple(message: ACLMessage) {
        const allReceivers = message.getAllReceivers()
        for (const receive of allReceivers) {
            const address = receive.getAddress()
            this.socket.emit(address, message)
        }
    }

    /**
     * Init private message listener
     *
     * @private
     */
    private initEventListener() {
        // Init events listeners
        this.socket.on("messages", async (args) => {
            try {
                const message = plainToClass(ACLMessage, <ACLMessage>args)
                const ontology = plainToClass(Ontology, <Ontology>message.getOntology())
                const classHandler = this.weak.get(ontology.getName())

                if (classHandler !== undefined) {
                    const response = await classHandler.handler(args)
                    if (response !== null) {
                        this.socket.emit(this.id.toString(), response)
                    }
                } else {
                    console.log("classHandler undefined")
                }
            } catch (e) {
                console.error(e)
            }
        })
        // Process the messages of clients
        this.socket.on(this.socket.id, async (args) => {
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
        // this.socket.on(this.socket.id, async (args) => {
        //     console.log("private chat", args)
        // })
    }

    public disconnect() {
        this.socket.disconnect()
    }
}