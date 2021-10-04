import { AID } from "./AID";
import { InteractionProtocol, Language, Ontology } from "./Ontology";
import { Utils } from "../Utils/Utils";

export enum Performative {
    NONE = 0,
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

interface IConstructorACLMessage {
    performative: Performative
}

export class ACLMessage {
    private sender: AID;
    private ontology: Ontology;
    private protocol: InteractionProtocol;
    private language: Language;
    private receivers: AID[];
    private in_reply_to: string;
    private reply_to: AID[];
    private reply_with: string;
    private content: string;
    private performative: Performative;
    private action: string;

    constructor(obj?: IConstructorACLMessage) {
        this.sender = new AID();
        this.ontology = new Ontology("");
        this.protocol = InteractionProtocol.NONE;
        this.language = "";
        this.receivers = [];
        this.reply_to = [];
        this.in_reply_to = "";
        this.reply_with = "";
        this.content = "";
        this.action = "";

        this.performative = obj && obj.performative || Performative.NONE;
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

    public getLanguage(): Language {
        return this.language;
    }

    public setLanguage(value: Language) {
        this.language = value;
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

    public setPerformative(value: Performative) {
        this.performative = value;
    }

    public getPerformative(): Performative {
        return this.performative;
    }

    public static getPerformative(perf: number): number {
        for (const value in Utils.enumKeys(Performative)) {
            if (perf.toString() === Performative[value]) {
                return parseInt(Performative[value]);
            }
        }
        return 0;
    }

    public setInReplyTo(reply: string) {
        this.in_reply_to = reply;
    }

    private getAllReplyTo(): AID[] {
        return this.reply_to;
    }

    public getInReplyTo(): string {
        return this.in_reply_to;
    }

    public getReplyWith(): string {
        return this.reply_with;
    }

    public setReplyWith(reply: string) {
        this.reply_with = reply;
    }

    public getContent(): string {
        return this.content;
    }

    public setContent(value: string) {
        this.content = value;
    }

    public getAction(): string {
        return this.action;
    }

    public setAction(value: string) {
        this.action = value;
    }

    public createReply(): ACLMessage {
        const m = new ACLMessage({
            performative: this.getPerformative()
        });
        const all_reply_to = this.getAllReplyTo();
        for (const reply of all_reply_to) {
            m.addReceiver(reply);
        }
        if (this.reply_to == null || this.reply_to.length === 0) {
            m.addReceiver(this.getSender());
        }
        m.setLanguage(this.getLanguage());
        m.setLanguage(this.getLanguage());
        m.setOntology(this.getOntology());
        m.setProtocol(this.getProtocol());
        m.setInReplyTo(this.getReplyWith());
        m.setAction(this.getAction());
        if (this.sender !== undefined) {
            m.setReplyWith(this.sender.name + new Date().toISOString());
        } else {
            m.setReplyWith("X" + new Date().toISOString());
        }
        /*
            m.setConversationId(this.getConversationId());
            const trace = this.getUserDefinedParameter("JADE-trace");
            if (trace != null) {
                m.addUserDefinedParameter("JADE-trace", trace);
            }

            if (this.messageEnvelope != null) {
                m.setDefaultEnvelope();
                const aclCodec = this.messageEnvelope.getAclRepresentation();
                if (aclCodec != null) {
                    m.getEnvelope().setAclRepresentation(aclCodec);
                }
            }
            else {
                m.setEnvelope(null);
            }
        */
        return m;
    }

    public clearAllReplyTo(): void {
        if (this.reply_to.length !== 0) {
            this.reply_to = [];
        }
    }

    public reset(): void {
        //this.source = null;
        this.receivers = [];
        if (this.reply_to.length !== 0) {
            this.reply_to = [];
        }
        this.performative = 10;
        this.content = "";
        //this.byteSequenceContent = null;
        this.reply_with = "";
        this.in_reply_to = "";
        this.language = "";
        this.ontology = new Ontology("");
        //this.reply_byInMilliseconds = 0;
        this.protocol = InteractionProtocol.NONE;
        // this.conversation_id = null;
        // if (this.userDefProps != null) {
        //     this.userDefProps.clear();
        // }
        // this.postTimeStamp = -1;
    }

    public toString(): string {
        return {
            performative: this.performative,
            language: this.language,
            protocol: this.protocol,
            ontology: this.ontology,
            sender: this.sender,
            receivers: this.receivers,
            in_reply_to: this.in_reply_to,
            reply_to: this.reply_to,
            reply_with: this.reply_with,
            content: this.content,
            action: this.action,
        }.toString();
    }

}