import { io } from "socket.io-client"
import { CoreAgents } from "../../../dist"
import { ConsoleManager } from "./ConsoleManager";

export const ws = io('ws://localhost:3000/')

ws.on("connect_error", (error) => {
    console.log('error')
    ws.disconnect()
})

// client-side
ws.on("connect", () => {
    console.log('connect')
    console.log(ws.id)

    // Define and init core agents
    const coreAgents = new CoreAgents(<any>ws)

    // Define and init the console manager
    const consoleManager = new ConsoleManager(coreAgents)

    consoleManager.init().then((r) => {
        console.log('End init ConsoleManager: ', r)
    })
})

ws.on("disconnect", (reason) => {
    console.log('disconnect')
    ws.disconnect()
})

console.log('End client')
