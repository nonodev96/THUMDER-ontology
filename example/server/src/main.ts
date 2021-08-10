import { createServer } from "http";
import { Server } from "socket.io";
import { CoreHandler } from "./CoreHandler";

const httpServer = createServer();
export const io = new Server(httpServer, {
    // path: "/my-custom-path/"
});


io.on("connection", (socket) => {
    console.log("connection")
    console.log(socket.id)

    const core = new CoreHandler(socket);
    core.init();

});

io.on('connect', (socket) => {
    console.log('connect')
    console.log(socket.id)
})

httpServer.listen(3000);