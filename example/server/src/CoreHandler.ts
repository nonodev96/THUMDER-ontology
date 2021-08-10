import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { io } from "./main";
import { InteractionProtocol, MessageTemplate, Performative } from "../../../dist";


export class CoreHandler {
    private socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>;

    constructor(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) {
        this.socket = socket;
    }

    init() {
        const template_FP = MessageTemplate.and(
            MessageTemplate.MatchProtocol(InteractionProtocol.FIPA_PROPOSE.toString()),
            MessageTemplate.MatchPerformative(Performative.PROPOSE.toString())
        );

        this.socket.on(template_FP.toString(), this.handlerPropose);

        const template_FS = MessageTemplate.and(
            MessageTemplate.MatchProtocol(InteractionProtocol.FIPA_SUBSCRIBE.toString()),
            MessageTemplate.MatchPerformative(Performative.SUBSCRIBE.toString())
        );

        this.socket.on(template_FS.toString(), this.handlerSubscribe);

        const template_FR = MessageTemplate.and(
            MessageTemplate.MatchProtocol(InteractionProtocol.FIPA_REQUEST.toString()),
            MessageTemplate.MatchPerformative(Performative.REQUEST.toString())
        );

        this.socket.on(template_FR.toString(), this.handlerRequest);

        console.log(
            template_FP.toString(),
            template_FS.toString(),
            template_FS.toString()
        )
    }

    handlerPropose(data: any) {
        console.log('Server: handlerPropose')
        console.log(data)
        io.sockets.emit("messages", 'response');
    }

    handlerSubscribe(data: any) {
        console.log('Server: handlerSubscribe')
        console.log(data)
        io.sockets.emit("messages", 'response');
    }

    handlerRequest(data: any) {
        console.log('Server: handlerRequest')
        console.log(data)
        io.sockets.emit("messages", 'response');
    }


}