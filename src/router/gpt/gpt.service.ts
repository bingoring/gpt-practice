import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { GptGetQueryDto } from './dto';
import { PromptEntity } from '@root/entity/prompt.entity';
import { AxiosClientService } from '@root/module/http/axios/axios.service';
import { BodyInserter } from '@root/module/http/bodyInserter.module';
import { GptResponseDto } from '@root/type/dto/gpt/response.type';
import _openai from 'openai';

@Injectable()
export class GptService {
    constructor(
        private readonly axiosClientService: AxiosClientService,
        @Inject('OpenaiInstance')
        private readonly openai: _openai,
        @InjectRepository(PromptEntity)
        private readonly promptRepository: Repository<PromptEntity>
    ) {}

    public async getWithHttp({ prompt }: GptGetQueryDto): Promise<{ content: string }> {
        const value = await this.getRespnoseFromGpt(prompt);
        await this.savePrompt({ prompt, content: value.content });
        return value;
    }

    private async getRespnoseFromGpt(prompt: string): Promise<{ content: string }> {
        const response = await this.axiosClientService
            .create('https://api.openai.com')
            .uri('/v1/chat/completions')
            .post()
            .body(
                BodyInserter.fromJSON({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: prompt }],
                })
            )
            .header({ Authorization: `Bearer ${process.env.OPENAI_API_KEY}` })
            .retrieve()
            .then((res) => res.toEntity(GptResponseDto));

        const content = response.choices?.[0]?.message?.content;

        return {
            content,
        };
    }

    private async savePrompt(promptEntity: DeepPartial<PromptEntity>) {
        await this.promptRepository.insert(promptEntity);
    }

    public async getWithLib({ prompt }: GptGetQueryDto): Promise<{ content: string }> {
        const response = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        });
        const content = response.choices?.[0]?.message?.content;

        await this.savePrompt({ prompt, content });
        return {
            content,
        };
    }
}
