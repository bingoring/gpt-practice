import { WebClient } from '@root/module/http/common/webClient.interface';
import got, { ExtendOptions } from 'got';
import { ResponseSpec } from '../responseSpec.module';
import { BodyInserter } from '../bodyInserter.module';
import { HttpMethodType } from '@root/type/http/method.type';

export class GotClient implements WebClient {
    private readonly _option: ExtendOptions;

    private static readonly TIMEOUT = 10_000;

    constructor(url?: string, timeout = GotClient.TIMEOUT) {
        this._option = {
            method: 'GET',
            url,
            timeout: {
                request: timeout,
                response: timeout,
            },
        };
    }

    public head(): this {
        this._option.method = HttpMethodType.head;
        return this;
    }

    public put(): this {
        this._option.method = HttpMethodType.put;
        return this;
    }

    public patch(): this {
        this._option.method = HttpMethodType.patch;
        return this;
    }

    public delete(): this {
        this._option.method = HttpMethodType.delete;
        return this;
    }

    public options(): this {
        this._option.method = HttpMethodType.options;
        return this;
    }

    public get(): this {
        this._option.method = HttpMethodType.get;
        return this;
    }

    public post(): this {
        this._option.method = HttpMethodType.post;
        return this;
    }

    public header(param: Record<string, string>): this {
        this._option.headers = param;
        return this;
    }

    public body<T>(inserter: BodyInserter<T>): this {
        this._option.headers = {
            ...this._option.headers,
            'Content-Type': inserter.mediaType,
        };
        this._option.body = inserter;
        return this;
    }

    public param(param: Record<string, unknown>): this {
        this._option.params = param;
        return this;
    }

    public uri(uri: string): this {
        this._option.url = uri;

        return this;
    }

    public async retrieve(): Promise<ResponseSpec> {
        const response = await got({
            ...this._option,
            isStream: false,
            resolveBodyOnly: false,
            responseType: 'text',
        });

        return new ResponseSpec(response.statusCode, response.body);
    }
}
