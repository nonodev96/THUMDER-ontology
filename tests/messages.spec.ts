import { ACLMessage, AID, MessageTemplate, InteractionProtocol, Ontology, Performative } from "../src";

describe("Check Core of Agents", () => {
    test("Check MessageTemplate", () => {
        const template: MessageTemplate = MessageTemplate.And(
            MessageTemplate.MatchProtocol(InteractionProtocol.FIPA_PROPOSE.toString()),
            MessageTemplate.MatchPerformative(Performative.PROPOSE.toString())
        );
        expect(template.toMatch.toString()).toEqual('(( Protocol: 6 ) AND ( Performative: 12 ))');
    });
    test("Check ACLMessage null", () => {
        const msg = new ACLMessage()
        expect(msg).toMatchObject({
            "content": "",
            "in_reply_to": "",
            "language": "",
            "ontology": {
                "name": "",
            },
            "performative": 0,
            "protocol": 0,
            "receivers": [],
            "reply_to": [],
            "reply_with": "",
            "action": "",
            "sender": {
                "name": "",
                "localName": "",
                "address": "",
            },
        })
    });
    test("Check ACLMessage REQUEST", () => {
        const msg = new ACLMessage({performative: Performative.REQUEST})
        msg.setProtocol(InteractionProtocol.FIPA_REQUEST);
        msg.setSender(new AID({name: "Anders-Hejlsberg", localName: "192.168.1.144-Anders-Hejlsberg"}));
        msg.setLanguage("THUMDER")
        msg.setOntology(new Ontology("Ontology-THUMDER"))
        msg.addReceiver(new AID({name: "Bill-Gates", localName: "192.168.1.144-Bill-Gates"}))
        expect(msg).toMatchObject({
            "content": "",
            "in_reply_to": "",
            "language": "THUMDER",
            "ontology": {
                "name": "Ontology-THUMDER",
            },
            "performative": 17,
            "protocol": 1,
            "receivers": [{
                "name": "Bill-Gates",
                "localName": "192.168.1.144-Bill-Gates",
                "address": "",
            }],
            "reply_to": [],
            "reply_with": "",
            "action": "",
            "sender": {
                "name": "Anders-Hejlsberg",
                "localName": "192.168.1.144-Anders-Hejlsberg",
                "address": "",
            },
        })
    });
    test("Check ACLMessage SUBSCRIBE", () => {
        const msg = new ACLMessage({performative: Performative.SUBSCRIBE})
        msg.setProtocol(InteractionProtocol.FIPA_SUBSCRIBE);
        msg.setSender(new AID({
            name: "Ada-Lovelace",
            localName: "192.168.1.144-Ada-Lovelace",
            address: "192.168.1.144"
        }));
        msg.setLanguage("THUMDER")
        msg.setOntology(new Ontology("Ontology-THUMDER"))
        msg.addReceiver(new AID({
            name: "James-Gosling",
            localName: "192.168.1.144-James-Gosling",
            address: "192.168.1.144"
        }));
        expect(msg).toMatchObject({
            "content": "",
            "in_reply_to": "",
            "language": "THUMDER",
            "ontology": {
                "name": "Ontology-THUMDER",
            },
            "performative": 20,
            "protocol": 7,
            "receivers": [{
                "name": "James-Gosling",
                "localName": "192.168.1.144-James-Gosling",
                "address": "192.168.1.144",
            }],
            "reply_to": [],
            "reply_with": "",
            "action": "",
            "sender": {
                "name": "Ada-Lovelace",
                "localName": "192.168.1.144-Ada-Lovelace",
                "address": "192.168.1.144",
            },
        })
    });
});