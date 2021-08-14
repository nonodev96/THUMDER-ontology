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

const msg = new ACLMessage({performative: Performative.REQUEST})
msg.setProtocol(InteractionProtocol.FIPA_REQUEST);
msg.setSender(new AID({name: "Anders-Hejlsberg", localName: "192.168.1.144-Anders-Hejlsberg"}));
msg.setLanguage("THUMDER")
msg.setOntology(new Ontology("Ontology-THUMDER"))
msg.addReceiver(new AID({name: "Bill-Gates", localName: "192.168.1.144-Bill-Gates"}))
msg.setContent("")
```

### Define Task SERVER

```ts
import { CoreAgents } from "thumder-ontology";
import { AchieveREInitiator } from "thumder-ontology";

class Task_RequestResponse extends AchieveREResponder {

    constructor() {
        super();
    }

    handleRequest(request: ACLMessage): ACLMessage {
        const message_reply = request.createReply();
        message_reply.setPerformative(Performative.AGREE);
        // CODE
        return message_reply
    }

    prepareResultNotification(request: ACLMessage, response: ACLMessage): ACLMessage {
        const reply = request.createReply()
        reply.setPerformative(Performative.INFORM)
        // CODE
        return reply
    }
}

```

### Add Task

```ts
const coreAgents = new CoreAgents(socket)
coreAgents.addTask(new Task_RequestResponse())
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
