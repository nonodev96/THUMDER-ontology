import { io } from "socket.io-client"
import { CoreAgentsClient } from "../../../dist"
import { ConsoleManager } from "./ConsoleManager";

export const socket = io('ws://localhost:3000/')
export const coreAgents = new CoreAgentsClient(<any>socket)
export const consoleManager = new ConsoleManager(coreAgents)

socket.on("connect_error", (error) => {
    console.log('error')
    socket.disconnect()
})

socket.on("disconnect", (reason) => {
    console.log('disconnect')
    socket.disconnect()
})

socket.on("messages", (messages) => {
    console.log('messages', messages)
})

// client-side
socket.on("connect", () => {
    console.log('connect', socket.id)
    coreAgents.clientID = socket.id
})

consoleManager.init().then((r) => {
    console.log('End ConsoleManager: ', r)
})

console.log('End client')
