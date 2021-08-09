export class Action {

    private _actionName?: string;
    private _actionContent?: string;
    private _actionObject?: Object;

    constructor() {
    }

    public getActionName(): string {
        return <string>this._actionName;
    }

    public setActionName(value: string) {
        this._actionName = value;
    }

    public getActionContent(): string {
        return <string>this._actionContent;
    }

    public setActionContent(value: string) {
        this._actionContent = value;
    }

    public getActionObject(): any {
        return this._actionObject;
    }

    public setActionObject(value: any) {
        this._actionObject = value;
    }
}