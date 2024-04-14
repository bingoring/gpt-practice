import { BodyInserter } from '../bodyInserter.module';
import { ResponseSpec } from '../responseSpec.module';

export interface WebClient {
    get(): this;

    head(): this;

    post(): this;

    put(): this;

    patch(): this;

    delete(): this;

    options(): this;

    uri(uri: string): this;

    header(param: Record<string, string>): this;

    body<T>(inserter: BodyInserter<T>): this;

    param(param: Record<string, unknown>): this;

    retrieve(): Promise<ResponseSpec>;
}
