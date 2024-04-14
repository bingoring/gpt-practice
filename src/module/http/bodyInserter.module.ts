import { MediaType } from '@root/type/http/media.type';

export class BodyInserter<T> {
    private constructor(
        private readonly _mediaType: MediaType,
        private readonly _data: T
    ) {}

    public static fromJSON(json: Record<string, unknown>) {
        return new BodyInserter(MediaType.applicationJson, json);
    }

    public static fromFormData(form: Record<string, unknown>) {
        return new BodyInserter(MediaType.applicationFormUrlencoded, form);
    }

    public static fromText(text: string | Buffer) {
        return new BodyInserter(MediaType.textPlain, text);
    }

    public get mediaType() {
        return this._mediaType;
    }

    public get data() {
        return this._data;
    }
}
