import { io } from "socket.io-client";
import { InteractionProtocol, MessageTemplate, Performative } from "../../../dist";
import * as inquirer from "inquirer";

const ws = io('ws://localhost:3000/');

// client-side
ws.on("connect", () => {
    console.log('connect');
    console.log(ws.id);
    console.log(ws.connected);
});

ws.on("connect_error", (err) => {
    console.log('error')
    console.log(err)
    ws.connect()
});

ws.on("disconnect", (reason) => {
    console.log('disconnect');
    console.log(ws.id);
    console.error(reason);
});

ws.on('messages', (data) => {
    console.log('Client: messages')
    console.log(data)
})

const template_RP = MessageTemplate.and(
    MessageTemplate.MatchProtocol(InteractionProtocol.FIPA_PROPOSE.toString()),
    MessageTemplate.MatchPerformative(Performative.PROPOSE.toString())
);

ws.emit(template_RP.toString(), 'pepe')


class Prompt {
    async initPrompt() {
        // console.clear();
        const answers = await inquirer.prompt({
            type: "input",
            name: "add",
            message: "Enter task:"
        });
        console.log(answers)

        return "end"
    }
}


console.log('initPrompt')
const response = new Prompt()
response.initPrompt().then(r => {
    console.log(r)
})


console.log('End initialization')
