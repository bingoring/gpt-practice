import { Global, Module } from '@nestjs/common';
import { AbstractWebClientService } from '../common/abstractWebClient.service';
import { GotClientService } from './got.service';

@Global()
@Module({
    providers: [
        {
            provide: AbstractWebClientService,
            useClass: GotClientService,
        },
    ],
    exports: [AbstractWebClientService],
})
export class GotClientModule {}
