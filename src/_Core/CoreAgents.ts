import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { MessageTemplate } from "./MessageTemplate";
import { Behaviour } from "./behaviours/Behaviour";
import { Action } from "./Action";
import { AchieveREInitiator } from "./proto/AchieveREInitiator";
import { AchieveREResponder } from "./proto/AchieveREResponder";


export class CoreAgents {
    private socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>;
    private readonly id: any

    constructor(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) {
        this.socket = socket
        this.id = socket.id
        this.initEventListener()
    }

    addTask(classHandler: Behaviour) {
        // Init events listeners
        this.socket.on("messages", async (args) => {
            switch (classHandler.getClassName()) {
                case AchieveREInitiator.name:

                    break;
                case AchieveREResponder.name:

                    break;
            }
            const response = await classHandler.handler(args)


            // response to this.id
            this.socket.emit(this.id.toString(), <any>{"value": "data"})
        })
    }

    send(msg: Action) {
        this.socket.emit("messages", msg, (args: any) => {

        })
    }


    private initEventListener() {
        this.socket.on(this.socket.id, async (args) => {

        })
    }
}