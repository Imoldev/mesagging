export abstract class Command {
    public readonly tenantId: string
    public readonly type: string;

    protected constructor(tenantId: string) {
        this.tenantId = tenantId;
        this.type = this.constructor.name
    }
}