import { Module } from '@nestjs/common';
import { AxiosClientModule } from '@root/module/http/axios/axios.module';
import { GptController } from './gpt.controller';
import { GptService } from './gpt.service';
import { OpenaiModule } from '@root/module/openai/openai.module';

@Module({
    imports: [AxiosClientModule, OpenaiModule],
    controllers: [GptController],
    providers: [GptService],
})
export class GptModule {}
