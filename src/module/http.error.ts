import { SystemError } from '@root/filter/custom.filter';

export class ServerConnectError extends SystemError {
    constructor(url: string) {
        const message = `Failed to connect to ${url}.`;
        super(message);
        this.name = `ServerConnectError`;
    }
}
