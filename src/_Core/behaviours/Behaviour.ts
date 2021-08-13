export abstract class Behaviour {

    public abstract handler(object: any): Promise<any>;

    public getClassName(): string {
        return "Behaviour"
    }
}