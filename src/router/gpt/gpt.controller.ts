import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GptService } from './gpt.service';
import { GptGetQueryDto, GptGetResponseDto } from './dto';
import { HttpStatusCode } from '../dto.abstract';

@ApiTags('gpt')
@Controller('/gpt')
export class GptController {
    constructor(private readonly gptService: GptService) {}

    @Get('/http')
    @ApiResponse({ type: GptGetResponseDto })
    public async getWithHttp(@Query() query: GptGetQueryDto): Promise<GptGetResponseDto> {
        const value = await this.gptService.getWithHttp(query);
        return {
            statusCode: HttpStatusCode.ok,
            value,
        };
    }

    @Get('/lib')
    @ApiResponse({ type: GptGetResponseDto })
    public async get(@Query() query: GptGetQueryDto): Promise<GptGetResponseDto> {
        const value = await this.gptService.getWithLib(query);
        return {
            statusCode: HttpStatusCode.ok,
            value,
        };
    }
}
