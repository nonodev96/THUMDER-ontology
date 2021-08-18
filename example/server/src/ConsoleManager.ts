import * as inquirer from "inquirer"
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Server } from "ws";

export class ConsoleManager {
    private socketsMap: Map<string, Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>>

    constructor(private io: Server) {
        this.socketsMap = new Map<string, Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>>()
    }

    public addSocket(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) {
        this.socketsMap.set(socket.id, socket)
    }

    public deleteSocket(id: string) {
        this.socketsMap.delete(id)
    }

    public async init() {
        let loop = true
        while (loop) {
            console.log("1. Emit")
            console.log("2. Emit all")
            console.log("9. Debug")
            console.log("0. Exit")
            let p = await inquirer.prompt({
                type: "input",
                name: "action",
                message: "Enter action:"
            })

            switch (p.action) {
                case "1":
                    await this.sendTo()
                    break;
                case "2":
                    await this.emitAll()
                    break;
                case "3":

                    break;
                case "9":
                    for (const socket of this.socketsMap.values()) {
                        console.log("Sockets:", socket.id)
                    }
                    break;
                case "0":
                    loop = false
                    this.io.close()
                    break;
                default:
                    break;
            }

            // wait
            await new Promise((resolve) => {
                setTimeout(args => {
                    resolve(true)
                }, 1000)
            })
        }
    }

    private async sendTo() {
        let p = await inquirer.prompt({
            type: "input",
            name: "action",
            message: "Enter id to send message:"
        })

        const socket = this.socketsMap.get(p.action)
        if (socket != undefined) {
            socket.emit('messages', {server: 'Hello world!'}, (response: any) => {
                console.log('Send To: response:', response)
            })
        }
    }

    private async emitAll() {
        let p = await inquirer.prompt({
            type: "input",
            name: "action",
            message: "Enter message to send:"
        })

        this.io.emit('messages', {message: 'message all: ' + p.action}, (response: any) => {
            console.log(response)
        })
    }
}