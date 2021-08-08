import { ACLMessage } from "./ACLMessage";

export class MessageTemplate {
    private toMatch: MatchExpression;

    constructor(toMatch: MatchExpression) {
        this.toMatch = toMatch;
    }

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
        return {}.toString();
    }
}

interface MatchExpression {
    match(p0: ACLMessage): boolean;
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
