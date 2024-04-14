import { WebClient } from '../common/webClient.interface';
import { AbstractWebClientService } from '../common/abstractWebClient.service';
import { AxiosClient } from './axios.client';

export class AxiosClientService extends AbstractWebClientService {
    public override create(url?: string): WebClient {
        return new AxiosClient(url);
    }
}
