import { ClassConstructor, plainToInstance } from 'class-transformer';

export class ResponseSpec {
    constructor(
        private readonly _statusCode: number,
        private readonly _body: string
    ) {}

    public toEntity<T>(entity: ClassConstructor<T>): T {
        return plainToInstance(entity, JSON.parse(this._body));
    }

    public get statusCode() {
        return this._statusCode;
    }

    public get rawBody(): string {
        return this._body;
    }
}
