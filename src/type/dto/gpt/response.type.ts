/* eslint-disable @typescript-eslint/naming-convention */

class GptResponseChoiceMessageDto {
    content: string;
    role: string;
}

class GptResponseChoiceDto {
    finish_reason: string;
    index: number;
    message: GptResponseChoiceMessageDto;
    logprobs: null | unknown; // 이 값은 null 또는 어떤 형태의 데이터가 올 수 있습니다.
}

export class GptResponseUsageDto {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
}

export class GptResponseDto {
    choices: GptResponseChoiceDto[];
    created: number;
    id: string;
    model: string;
    object: string;
    usage: GptResponseUsageDto;
}
