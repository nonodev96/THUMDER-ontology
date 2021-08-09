import { Concept } from "../_Core/content/Concept";

export class AgentCommunication implements Concept {

    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    public getName(): string {
        return this._name
    }

    public setName(value: string){
        this._name = value
    }
}

export class Client extends AgentCommunication {

}

export class Server extends AgentCommunication {

}