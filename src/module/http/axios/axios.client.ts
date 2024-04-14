import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { WebClient } from '../common/webClient.interface';
import { BodyInserter } from '../bodyInserter.module';
import { ResponseSpec } from '../responseSpec.module';
import { HttpMethodType } from '@root/type/http/method.type';
import { CustomHttpError } from '@root/filter/http.filter';
import { ServerConnectError } from '@root/module/http.error';

export class AxiosClient implements WebClient {
    private readonly option: AxiosRequestConfig;

    constructor(
        private readonly baseURL: string,
        private readonly timeout = 10000
    ) {
        this.option = {
            baseURL,
            timeout,
        };
    }

    public get(): this {
        this.option.method = HttpMethodType.get;
        return this;
    }

    public head(): this {
        this.option.method = HttpMethodType.head;
        return this;
    }

    public post(): this {
        this.option.method = HttpMethodType.post;
        return this;
    }

    public put(): this {
        this.option.method = HttpMethodType.put;
        return this;
    }

    public patch(): this {
        this.option.method = HttpMethodType.patch;
        return this;
    }

    public delete(): this {
        this.option.method = HttpMethodType.delete;
        return this;
    }

    public options(): this {
        this.option.method = HttpMethodType.options;
        return this;
    }

    public uri(uri: string): this {
        this.option.url = uri;
        return this;
    }

    public header(param: Record<string, string>): this {
        this.option.headers = { ...this.option.headers, ...param };
        return this;
    }

    public param(param: Record<string, unknown>): this {
        this.option.params = param;
        return this;
    }

    public body<T>(inserter: BodyInserter<T>): this {
        this.option.headers = {
            ...(this.option.headers ?? {}),
            'Content-Type': inserter.mediaType,
        };
        this.option.data = inserter.data;
        return this;
    }

    public async retrieve(): Promise<ResponseSpec> {
        try {
            const response: AxiosResponse = await axios(this.option);
            return new ResponseSpec(response.status, response.data);
        } catch (e) {
            if (e instanceof AxiosError && e.response?.data !== undefined) {
                const data = e.response?.data;
                const statusCode = data?.statusCode;

                if (statusCode !== undefined) {
                    throw new CustomHttpError(statusCode, data.error?.code, data.message ?? data.error?.message);
                }
            }

            if (e instanceof Error && e.message.includes('connect ECONNREFUSED ')) {
                const errorUrl = e.message.split('connect ECONNREFUSED ')[1];
                throw new ServerConnectError(errorUrl);
            }

            throw e;
        }
    }
}
