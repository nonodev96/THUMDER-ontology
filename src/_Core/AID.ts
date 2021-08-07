import { Performative } from "./ACLMessage";

interface AID_Constructor {
    name: string,
    localName: string
}

export class AID {
    public name: string = ""
    public localName: string = ""
    public addresses: Set<string> = new Set<string>()

    constructor(obj?: AID_Constructor) {
        this.name = obj && obj.name || "";
        this.localName = obj && obj.localName || "";
    }

    addAddresses(url: string): void {
        this.addresses.add(url);
    }

    removeAddresses(url: string): boolean {
        return this.addresses.delete(url);
    }

    clearAllAddresses() {
        this.addresses.clear();
    }

    getAllAddresses(): string[] {
        const values = [];
        for (const item of Array.from(this.addresses.values())) {
            values.push(item);
        }
        return values;
    }

    public getName(value: string) {
        this.name = value;
    }

    public setName(): string {
        return this.name;
    }

    public getLocalName(value: string) {
        this.localName = value;
    }

    public setLocalName(): string {
        return this.localName;
    }

}