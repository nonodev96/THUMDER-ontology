import * as inquirer from "inquirer"
import {
    ACLMessage,
    AID,
    CoreAgents,
    CreateFile,
    CreateFolder,
    Ontology,
    Performative,
    CFPSimulation
} from "../../../dist"
import {
    Task_ContractNetInitiator,
    Task_CreateFile_RequestInitiator,
    Task_CreateFolder_RequestInitiator
} from "./Tasks"

export class ConsoleManager {
    private coreAgents

    constructor(coreAgents: CoreAgents) {
        this.coreAgents = coreAgents
    }

    async init() {
        let loop = true
        while (loop) {
            console.log("\n", "\n", "\n")
            console.log("1. Test Make-File")
            console.log("2. Test Make-Folder")
            console.log("3. CFP Simulation")
            console.log("0. Exit")
            let p = await inquirer.prompt({
                type: "input",
                name: "action",
                message: "Enter action:"
            })

            switch (p.action) {
                case "1":
                    await this.requestCreateFile()
                    break;
                case "2":
                    await this.requestCreateFolder()
                    break;
                case "3":
                    await this.cfpNewSimulation()
                    break;
                case "0":
                    loop = false
                    this.coreAgents.disconnect()
                    break;
                default:
                    break;
            }


            await new Promise(resolve => {
                setTimeout(args => {
                    resolve(true)
                }, 1000)
            })
        }
    }

    async requestCreateFile() {
        const createFile = new CreateFile('path/to/folder', 'tests/', 'example_00.s')
        const createFile_string = JSON.stringify(createFile)
        const message = new ACLMessage()
        message.setSender(new AID({
            name: "Client",
            localName: "Client-" + this.coreAgents.id,
            address: this.coreAgents.id
        }))
        message.setPerformative(Performative.REQUEST)
        message.setOntology(new Ontology("Make-File"))
        message.setContent(createFile_string)

        this.coreAgents.addTask(new Task_CreateFile_RequestInitiator("Make-File", message))
    }

    async requestCreateFolder() {
        const createFolder = new CreateFolder('path/to/folder', 'tests/', 'newFolder/')
        const createFolder_string = JSON.stringify(createFolder)
        const message = new ACLMessage()
        message.setSender(new AID({
            name: "Client",
            localName: "Client-" + this.coreAgents.id,
            address: this.coreAgents.id
        }))
        message.setPerformative(Performative.REQUEST)
        message.setOntology(new Ontology("Make-Folder"))
        message.setContent(createFolder_string)

        this.coreAgents.addTask(new Task_CreateFolder_RequestInitiator("Make-Folder", message))
    }

    async cfpNewSimulation() {
        const cfpSimulation = new CFPSimulation()
        const cfpSimulation_string = JSON.stringify(cfpSimulation)
        const cfp = new ACLMessage()
        cfp.setSender(new AID({
            name: "Client",
            localName: "Client-" + this.coreAgents.id,
            address: this.coreAgents.id
        }))
        cfp.setPerformative(Performative.CFP)
        cfp.setOntology(new Ontology("CFPSimulation"))
        cfp.setContent(cfpSimulation_string)

        this.coreAgents.addTask(new Task_ContractNetInitiator("CFP-Simulation", cfp))
    }

}