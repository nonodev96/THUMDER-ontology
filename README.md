# THUMDER Ontology

| Command           | Description                                               |
| ----------------- | --------------------------------------------------------- |
| `npm run build`   | Build the app. Your built files are in the /dist folder.  |
| `npm run test`    | Test the app with jest                                    |

## Via npm

```
npm install thumder-ontology --save
```

## Example

```ts
import { ACLMessage } from "thumder-ontology";

class Test {
    message(): ACLMessage {
        const msg = new ACLMessage({performative: Performative.REQUEST})
        msg.setProtocol(InteractionProtocol.FIPA_REQUEST);
        msg.setSender(new AID({name: "Anders-Hejlsberg", localName: "192.168.1.144-Anders-Hejlsberg"}));
        msg.setLanguage("THUMDER")
        msg.setOntology(new Ontology("Ontology-THUMDER"))
        msg.addReceiver(new AID({name: "Bill-Gates", localName: "192.168.1.144-Bill-Gates"}))
        msg.setContent("")
        return msg;
    }
}
```

## Communication



## Design of ontology

### Concept

![README_Concept](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/nonodev96/THUMDER_ontology/master/assets/VocabularyConcept.puml)

### AgentAction

![README_AgentAction](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/nonodev96/THUMDER_ontology/master/assets/VocabularyAgentAction.puml)

### Predicate

![README_Predicate](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/nonodev96/THUMDER_ontology/master/assets/VocabularyPredicate.puml)
