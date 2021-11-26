import { io } from "socket.io-client";
import { CoreAgentsClient } from "../../../dist";
import { ConsoleManager } from "./ConsoleManager";

export const delay = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms));
};

export const socket = io("ws://localhost:3000/");
export const coreAgents = new CoreAgentsClient(<any>socket);
export const consoleManager = new ConsoleManager(coreAgents);

const start = async () => {
  await delay(2000);
  consoleManager.init().then(() => {
    console.log("End");
  });
};

start().then((r) => {});
