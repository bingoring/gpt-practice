import { Module } from '@nestjs/common';
import openai from 'openai';

@Module({
    providers: [
        {
            provide: 'OpenaiInstance', // OpenAI 인스턴스를 제공하는 프로바이더
            useValue: new openai({ apiKey: process.env.OPENAI_API_KEY }), // OpenAI 인스턴스 생성 및 제공
        },
    ],
    exports: ['OpenaiInstance'], // 다른 모듈에서 OpenAI 인스턴스를 사용할 수 있도록 export
})
export class OpenaiModule {}
