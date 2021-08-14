interface AID_Constructor {
    name: string,
    localName?: string,
    address?: string
}

export class AID {
    public name: string
    public localName: string
    public address: string

    constructor(obj?: AID_Constructor) {
        this.name = obj && obj.name || "";
        this.localName = obj && obj.localName || "";
        this.address = obj && obj.address || "";
    }

    public setName(value: string) {
        this.name = value;
    }

    public getName(): string {
        return this.name;
    }

    public getLocalName(value: string) {
        this.localName = value;
    }

    public setLocalName(): string {
        return this.localName;
    }

    public setAddress(value: string) {
        this.address = value;
    }

    public getAddress(): string {
        return this.address;
    }

}