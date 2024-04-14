import { WebClient } from '../common/webClient.interface';
import { AbstractWebClientService } from '../common/abstractWebClient.service';
import { GotClient } from './got.client';

export class GotClientService extends AbstractWebClientService {
    public override create(url?: string): WebClient {
        return new GotClient(url);
    }
}
