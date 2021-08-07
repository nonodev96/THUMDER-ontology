export enum InteractionProtocol {
    NONE,
    FIPA_REQUEST,
    FIPA_QUERY,
    FIPA_REQUEST_WHEN,
    FIPA_BROKERING,
    FIPA_RECRUITING,
    FIPA_PROPOSE,
    FIPA_SUBSCRIBE,
    FIPA_ENGLISH_AUCTION,
    FIPA_DUTCH_AUCTION,
    FIPA_CONTRACT_NET,
    FIPA_ITERATED_CONTRACT_NET,
    ITERATED_FIPA_REQUEST,
}

export class Ontology {

    private name: string = ""

    constructor(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public setName(value: string) {
        this.name = value;
    }
}