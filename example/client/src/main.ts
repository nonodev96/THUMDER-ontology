import { io } from "socket.io-client"
import * as inquirer from "inquirer"
import {
    CoreAgents,
    Action,
    ACLMessage,
    Performative,
    AchieveREInitiator,
    InteractionProtocol,
    MessageTemplate
} from "../../../dist"
// 'Socket<DefaultEventsMap, DefaultEventsMap>'
// 'Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>'
// 'Socket<DefaultEventsMap, DefaultEventsMap>'
// 'Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>'

const ws = io('ws://localhost:3000/')


class Task_Request extends AchieveREInitiator {

    handleAllResponses(responses: ACLMessage[]): void {
        console.log('Task_Request handleAllResponses')
        for (const response of responses) {
            console.log(response.getContent())
        }
    }

    handleAllResultNotifications(resultNotifications: ACLMessage[]): void {
        console.log('Task_Request handleAllResultNotifications')
    }

    handleOutOfSequence(msg: ACLMessage): void {
        console.log('Task_Request handleOutOfSequence')
    }

    handleAgree(agree: ACLMessage): void {
        console.log("handleAgree")
    }

    handleRefuse(refuse: ACLMessage): void {
        console.log("handleRefuse")
    }

    handleInform(inform: ACLMessage): void {
        console.log("handleInform")
    }
}

class ConsoleManager {
    private coreAgents

    constructor(coreAgents: CoreAgents) {
        this.coreAgents = coreAgents
    }

    async init() {
        let loop = true
        while (loop) {
            console.log("1. sendNewRequest")
            console.log("2. sendNewProposeArray")
            let p = await inquirer.prompt({
                type: "input",
                name: "action",
                message: "Enter action:"
            })

            switch (p.action) {
                case "1":
                    await this.sendNewRequest()
                    break;
                case "2":
                    await this.sendNewProposeArray()
                    break;
                case "0":
                    loop = false
                    break;
                default:
                    break;
            }
        }
    }

    async sendNewRequest() {
        let p = await inquirer.prompt({
            type: "input",
            name: "content",
            message: "Enter content of ACLMessage:"
        })
        const message = new ACLMessage({performative: Performative.REQUEST})
        message.setContent(p.content ?? 'hello world!')

        const a = new Action()
        a.setActionName("sendNewRequest")
        a.setActionObject(message)

        this.coreAgents.send(a)
    }

    async sendNewProposeArray() {
        const message_1 = new ACLMessage({performative: Performative.PROPOSE})
        message_1.setContent('1 hello world!')
        const message_2 = new ACLMessage({performative: Performative.PROPOSE})
        message_1.setContent('2 hello world!')

        const a = new Action()
        a.setActionName("sendNewProposeArray")
        a.setActionObject([message_1, message_2])

        this.coreAgents.send(a)
    }
}


ws.on("connect_error", (err) => {
    console.log('error')
    console.log(err)
    ws.connect()
})

// client-side
ws.on("connect", () => {
    console.log('connect')
    console.log(ws.id)

    const coreAgents = new CoreAgents(<any>ws)
    const message = new ACLMessage()
    message.setContent("Hello")

    // const template = MessageTemplate.And(
    //     MessageTemplate.MatchProtocol(InteractionProtocol.FIPA_REQUEST.toString()),
    //     MessageTemplate.MatchPerformative(Performative.REQUEST.toString())
    // )

    coreAgents.addTask(new Task_Request(message))

    const consoleManager = new ConsoleManager(coreAgents)
    consoleManager.init().then(r => {
        console.log('end initPrompt: ', r)
    })
})

ws.on("disconnect", (reason) => {
    console.log('disconnect')
    console.log(ws.id)
    console.error(reason)
})

ws.on('connection', (socket) => {
    console.log('Client: connection')
    console.log(socket)
})


console.log('End initialization')
