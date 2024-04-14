import { WebClient } from './webClient.interface';

export abstract class AbstractWebClientService {
    public abstract create(url?: string): WebClient;
}
