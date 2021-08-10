import { ACLMessage } from "./ACLMessage";
import { AID } from "./AID";
import { InteractionProtocol } from "./Ontology";


export class MessageTemplate {
    public toMatch: MatchExpression;

    constructor(toMatch: MatchExpression) {
        this.toMatch = toMatch;
    }

    static MatchSender(value: AID): MessageTemplate {
        return new MessageTemplate(new Literal(value, -1));
    }

    static MatchConversationId(value: string): MessageTemplate {
        return new MessageTemplate(new Literal(value, 0));
    }

    static MatchEncoding(value: string): MessageTemplate {
        return new MessageTemplate(new Literal(value, 1));
    }

    static MatchInReplyTo(value: string): MessageTemplate {
        return new MessageTemplate(new Literal(value, 2));
    }

    static MatchLanguage(value: string): MessageTemplate {
        return new MessageTemplate(new Literal(value, 3));
    }

    static MatchOntology(value: string): MessageTemplate {
        return new MessageTemplate(new Literal(value, 4));
    }

    static MatchProtocol(value: string): MessageTemplate {
        return new MessageTemplate(new Literal(value, 5));
    }

    static MatchReplyWith(value: string): MessageTemplate {
        return new MessageTemplate(new Literal(value, 7));
    }

    static MatchReceiver(values: AID[]): MessageTemplate {
        return new MessageTemplate(new Literal(values, 9));
    }

    static MatchReplyTo(values: AID[]): MessageTemplate {
        return new MessageTemplate(new Literal(values, 10));
    }

    static MatchPerformative(value: string): MessageTemplate {
        return new MessageTemplate(new Literal(value, 11));
    }


    static MatchContent(value: string): MessageTemplate {
        return new MessageTemplate(new Literal(value, 12));
    }
    /*
    public MatchReplyByDate(value: Date): MessageTemplate {
        return new MessageTemplate(new Literal(value, 14));
    }
    */


    static and(op1: MessageTemplate, op2: MessageTemplate): MessageTemplate {
        const e = new AndExpression(op1.toMatch, op2.toMatch);
        return new MessageTemplate(e);
    }

    static or(op1: MessageTemplate, op2: MessageTemplate): MessageTemplate {
        const e = new OrExpression(op1.toMatch, op2.toMatch);
        return new MessageTemplate(e);
    }

    static not(op1: MessageTemplate): MessageTemplate {
        const e = new NotExpression(op1.toMatch);
        return new MessageTemplate(e);
    }

    toString(): string {
        return this.toMatch.toString();
    }
}

interface MatchExpression {
    match(msg: ACLMessage): boolean;

    toString(): string;
}

class Literal implements MatchExpression {
    matchValue: Object;
    perfValue: number;
    slotName: number;

    constructor(value: any, number: number) {
        this.matchValue = value;
        this.slotName = number;
        this.perfValue = 0;
    }

    match(msg: ACLMessage): boolean {
        switch (this.slotName) {
            case 0: {
                return false; // CaseInsensitiveString.equalsIgnoreCase(this.matchValue, msg.getConversationId());
            }
            case 1: {
                return false; // CaseInsensitiveString.equalsIgnoreCase(this.matchValue, msg.getEncoding());
            }
            case 2: {
                return CaseInsensitiveString.equalsIgnoreCase(this.matchValue, msg.getInReplyTo());
            }
            case 3: {
                return CaseInsensitiveString.equalsIgnoreCase(this.matchValue, msg.getLanguage());
            }
            case 4: {
                return CaseInsensitiveString.equalsIgnoreCase(this.matchValue, msg.getOntology());
            }
            case 5: {
                return CaseInsensitiveString.equalsIgnoreCase(this.matchValue, msg.getProtocol());
            }
            case 7: {
                return CaseInsensitiveString.equalsIgnoreCase(this.matchValue, msg.getReplyWith());
            }
            case 9: {
                return false;
            }
            case 10: {
                return false;
            }
            case 11: {
                return this.perfValue == msg.getPerformative();
            }
            case 12: {
                return CaseInsensitiveString.equalsIgnoreCase(this.matchValue, msg.getContent());
            }
            case 13: {
                return false; // this.matchValue != null && ((AID) this.matchValue).equals(msg.getSender());
            }
            case 14: {
                return false; // ((Date) this.matchValue).equals(msg.getReplyByDate());
            }
            default: {
                return false;
            }
        }
    }

    public toString(): string {
        switch (this.slotName) {
            case 0: {
                return "( ConversationId: " + this.matchValue.toString() + " )";
            }
            case 1: {
                return "( Encoding: " + this.matchValue.toString() + " )";
            }
            case 2: {
                return "( InReplyTo: " + this.matchValue.toString() + " )";
            }
            case 3: {
                return "( Language: " + this.matchValue.toString() + " )";
            }
            case 4: {
                return "( Ontology: " + this.matchValue.toString() + " )";
            }
            case 5: {
                return "( Protocol: " + this.matchValue.toString() + " )";
            }
            case 7: {
                return "( ReplyWith: " + this.matchValue.toString() + " )";
            }
            case 9: {
                /*
                if (this.matchValue != null) {
                    final AID[] receivers = (AID[])this.matchValue;
                    String output = "( Receivers: ";
                    for (int i = 0; i < receivers.length; ++i) {
                        final AID recToMatch = receivers[i];
                        output += recToMatch.toString();
                    }
                    return output + " )";
                }
                */
                return "( Receivers: null )";
            }
            case 10: {
                /*
                if (this.matchValue != null) {
                    final AID[] receivers = (AID[])this.matchValue;
                    String output = "( ReplyTo: ";
                    for (int i = 0; i < receivers.length; ++i) {
                        final AID recToMatch = receivers[i];
                        output += recToMatch.toString();
                    }
                    return output + " )";
                }
                */
                return "( ReplyTo: null )";
            }
            case 11: {
                // return "( Performative: " + ACLMessage.getPerformative(this.perfValue) + " )";
                return "( Performative: " + this.matchValue.toString() + " )";
            }
            case 12: {
                return "( Content: " + this.matchValue.toString() + " )";
            }
            case 13: {
                if (this.matchValue != null) {
                    return "( Sender AID: " + (this.matchValue).toString() + " )";
                }
                return "( Sender AID: null )";
            }
            case 14: {
                return "( ReplyByDate: " + this.matchValue + " )";
            }
            default: {
                return "No slot. This casa should never occur !!!";
            }
        }
    }
}


class AndExpression implements MatchExpression {

    private op1: MatchExpression;
    private op2: MatchExpression;

    constructor(e1: MatchExpression, e2: MatchExpression) {
        this.op1 = e1;
        this.op2 = e2;
    }

    public match(msg: ACLMessage): boolean {
        return this.op1.match(msg) && this.op2.match(msg);
    }

    public toString(): string {
        return "(" + this.op1.toString() + " AND " + this.op2.toString() + ")";
    }
}

class OrExpression implements MatchExpression {
    private op1: MatchExpression;
    private op2: MatchExpression;

    constructor(e1: MatchExpression, e2: MatchExpression) {
        this.op1 = e1;
        this.op2 = e2;
    }

    public match(msg: ACLMessage): boolean {
        return this.op1.match(msg) || this.op2.match(msg);
    }

    public toString(): string {
        return "(" + this.op1.toString() + " OR " + this.op2.toString() + ")";
    }
}

class NotExpression implements MatchExpression {
    private op: MatchExpression;

    constructor(e: MatchExpression) {
        this.op = e;
    }

    public match(msg: ACLMessage): boolean {
        return !this.op.match(msg);
    }

    public toString(): string {
        return "(NOT " + this.op.toString() + ")";
    }
}


class CaseInsensitiveString {
    static equalsIgnoreCase(op1: any, op2: any): boolean {
        return op1.toString().toLowerCase() === op2.toString().toLowerCase();
    }
}