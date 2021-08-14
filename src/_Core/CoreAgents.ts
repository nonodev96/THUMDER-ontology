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


export class CoreAgents {
    private socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
    public readonly id: string
    private weak: WeakMap<{ key: string }, Behaviour>

    constructor(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) {
        this.socket = socket
        this.id = socket.id
        this.weak = new WeakMap<{ key: string }, Behaviour>()
        this.initEventListener()
    }

    /**
     * Add new task to handler and process
     * @param classHandler
     */
    public addTask(classHandler: Behaviour) {
        // read the task name
        if (!this.weak.has({key: classHandler.getClassName()})) {
            this.weak.set({key: classHandler.getClassName()}, classHandler)
            console.log("add Task: ", classHandler.getClassName())

            switch (classHandler.getClassName()) {
                case AchieveREInitiator.name:
                    this.sendToServer(classHandler.getMessage())
                    break;
                case AchieveREResponder.name:

                    break;
                case ContractNetInitiator.name:
                    // this.send(classHandler.getMessage())
                    break;
                case ContractNetResponder.name:

                    break;
                case ProposeInitiator.name:
                    // this.send(classHandler.getMessage())
                    break;
                case ProposeResponder.name:

                    break;
            }

            // Init events listeners
            this.socket.on("messages", async (args) => {
                console.log("server")
                classHandler.handler(args)
                const response = await classHandler.getResponse()
                if (response !== null) {
                    this.socket.emit(this.id.toString(), response)
                }
            })

            // Process the messages of clients
            this.socket.on(this.socket.id, async (args) => {
                console.log("client", args)
                classHandler.handler(args)
                const response = await classHandler.getResponse()
                console.log("client process the response", response)
                // if (response !== null) {
                //     this.socket.emit(this.id.toString(), response)
                // }
            })
        }
    }

    public sendToServer(msg: ACLMessage) {
        this.socket.emit("messages", msg)
    }

    public sendMultiple(message: ACLMessage) {
        const allReceivers = message.getAllReceivers()
        for (const receive of allReceivers) {
            const address = receive.getAddress()
            this.socket.emit(address, message, (args: any) => {
                console.log("args", args)
            })
        }
    }

    /**
     * Init private message listener
     *
     * @private
     */
    private initEventListener() {
        // this.socket.on(this.socket.id, async (args) => {
        //     console.log("private chat", args)
        // })
    }

    public disconnect() {
        this.socket.disconnect()
    }
}