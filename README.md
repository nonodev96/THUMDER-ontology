# THUMDER Ontology

| Command               | Description                                               |
| --------------------- | --------------------------------------------------------- |
| `npm run dev`         | Build the app. Your built files are in the `/dist` folder |
| `npm run dev:server`  | Build the example for server                              |
| `npm run dev:client`  | Build the example for client                              |
| `npm run node:server` | Execute the example for server                            |
| `npm run node:client` | Execute the example for client                            |
| `npm run test`        | Test the app with jest                                    |

## Via npm

```
npm install thumder-ontology --save
```

### Via npm with version

```
npm install thumder-ontology@<version> --save
```

## Examples

```ts
import { ACLMessage, Performative, InteractionProtocol } from "thumder-ontology";

const createFile = new CreateFile('path/to/folder', 'tests/', 'example_00.s')
const createFile_string = JSON.stringify(createFile)
const message = new ACLMessage()
message.setSender(new AID({
    name: "Client",
    localName: "Client-" + this.coreAgents.clientID,
    address: this.coreAgents.clientID
}))
message.setPerformative(Performative.REQUEST)
message.setOntology(new Ontology("Make-File"))
message.setContent(createFile_string)

this.coreAgents.addTask(new Task_CreateFile_RequestInitiator("Make-File", message))
```

### Define Task - SERVER

```ts
import { ACLMessage, AchieveREResponder } from "thumder-ontology";

export class Task_CreateFile_RequestResponse extends AchieveREResponder {
    constructor(taskName: string) {
        super(taskName);
        console.log("Task_CreateFile_RequestResponse")
    }

    handleRequest(request: ACLMessage): ACLMessage {
        console.log("Task_CreateFile_RequestResponse handleRequest", this.getTaskName())
        const message_reply = request.createReply();
        message_reply.setPerformative(Performative.AGREE);
        return message_reply
    }
}
```

### Define Task - CLIENT

```ts
import { AchieveREInitiator, ACLMessage } from "thumder-ontology";

export class Task_CreateFile_RequestInitiator extends AchieveREInitiator {
    constructor(taskName: string, message: ACLMessage) {
        super(taskName, message)
        console.log("Task_CreateFile_RequestInitiator")
    }

    handleAgree(agree: ACLMessage): null {
        console.log("Task_CreateFile_RequestInitiator handleAgree")
        return null
    }

    handleRefuse(refuse: ACLMessage): null {
        console.log("Task_CreateFile_RequestInitiator handleRefuse")
        return null
    }

    handleInform(inform: ACLMessage): null {
        console.log("Task_CreateFile_RequestInitiator handleInform")
        return null
    }
}
```

### Add Task

```ts
import { CoreAgentsServer } from "./CoreAgentsClient";

const coreAgents = new CoreAgentsServer(<any>io)
coreAgents.addTask(new Task_RequestResponse())

io.on("connection", (socket) => {
    socket.on("disconnect", (args) => {
        coreAgentsServer.deleteSocket(socket.id)
        consoleManager.deleteSocket(socket.id)
    })
    coreAgentsServer.addNewSocket(socket)
    consoleManager.addSocket(socket)
});
```

```ts
import { CoreAgentsClient } from "./CoreAgentsServer";

const coreAgents = new CoreAgentsClient(<any>socket)

socket.on("connect", () => {
    console.log('connect', socket.id)
    coreAgents.clientID = socket.id
})
```

## Design of ontology

#### Concept

![README_Concept](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/nonodev96/THUMDER_ontology/master/assets/VocabularyConcept.puml)

#### AgentAction

![README_AgentAction](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/nonodev96/THUMDER_ontology/master/assets/VocabularyAgentAction.puml)

#### Predicate

![README_Predicate](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/nonodev96/THUMDER_ontology/master/assets/VocabularyPredicate.puml)


# Tasks

<div style="text-align: center">

![README_Predicate](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/nonodev96/THUMDER_ontology/master/assets/2.3_Sequence.puml)

![README_Predicate](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/nonodev96/THUMDER_ontology/master/assets/2.3.1_Sequence.puml)

![README_Predicate](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/nonodev96/THUMDER_ontology/master/assets/2.4.1_Sequence.puml)

![README_Predicate](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/nonodev96/THUMDER_ontology/master/assets/2.4_Sequence.puml)

![README_Predicate](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/nonodev96/THUMDER_ontology/master/assets/2.5.1_Sequence.puml)

![README_Predicate](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/nonodev96/THUMDER_ontology/master/assets/2.5_Sequence.puml)

![README_Predicate](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/nonodev96/THUMDER_ontology/master/assets/2.6_Sequence.puml)

</div>
