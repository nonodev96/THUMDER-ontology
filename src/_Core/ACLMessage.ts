import { AID } from "./AID";
import { Ontology, InteractionProtocol } from "./Ontology";

export enum Performative {
    NONE,
    ACCEPT_PROPOSAL,
    AGREE,
    CANCEL,
    CFP,
    CONFIRM,
    DIS_CONFIRM,
    FAILURE,
    INFORM,
    INFORM_IF,
    INFORM_REF,
    NOT_UNDERSTOOD,
    PROPOSE,
    QUERY_IF,
    QUERY_REF,
    REFUSE,
    REJECT_PROPOSAL,
    REQUEST,
    REQUEST_WHEN,
    REQUEST_WHENEVER,
    SUBSCRIBE,
    PROXY,
    PROPAGATE,
    UNKNOWN,
}

export class ACLMessage {
    private sender: AID;
    private ontology: Ontology;
    private protocol: InteractionProtocol;
    private receivers: AID[];
    private content: string;
    private performative: Performative;

    constructor() {
        this.sender = new AID();
        this.ontology = new Ontology("NONE");
        this.protocol = InteractionProtocol.NONE;
        this.receivers = [];
        this.content = "";
        this.performative = Performative.NONE;
    }

    public getSender(): AID {
        return this.sender;
    }

    public setSender(value: AID) {
        this.sender = value;
    }

    public getOntology(): Ontology {
        return this.ontology;
    }

    public setOntology(value: Ontology) {
        this.ontology = value;
    }

    public getProtocol(): InteractionProtocol {
        return this.protocol;
    }

    public setProtocol(value: InteractionProtocol) {
        this.protocol = value;
    }

    public addReceiver(aid: AID) {
        this.receivers.push(aid);
    }

    public getAllReceivers(): AID[] {
        return this.receivers;
    }

    public clearAllReceiver() {
        this.receivers = [];
    }

    public getPerformative(value: Performative) {
        this.performative = value;
    }

    public setPerformative(): Performative {
        return this.performative;
    }

    public getContent(): string {
        return this.content;
    }

    public setContent(value: string) {
        this.content = value;
    }

    public getJSONString(): string {
        return {
            ontology: this.ontology,
            protocol: this.protocol,
            performative: this.performative,
            sender: this.sender,
            receivers: this.receivers,
            content: this.content,
        }.toString();
    }

}