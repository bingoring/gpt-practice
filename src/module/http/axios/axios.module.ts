import { Global, Module } from '@nestjs/common';
import { AxiosClientService } from './axios.service';
import { AbstractWebClientService } from '../common/abstractWebClient.service';

@Global()
@Module({
    providers: [
        {
            provide: AbstractWebClientService,
            useClass: AxiosClientService,
        },
    ],
    exports: [AbstractWebClientService],
})
export class AxiosClientModule {}
