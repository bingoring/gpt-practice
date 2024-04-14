import { ApiProperty } from '@nestjs/swagger';
import { AbstractGatewayResponse } from '@root/router/dto.abstract';
import { IsString } from 'class-validator';

export class GptGetQueryDto {
    @ApiProperty()
    @IsString()
    prompt!: string;
}

class AgentGetResponseValueDto {
    @ApiProperty()
    @IsString()
    content!: string;
}

export class GptGetResponseDto extends AbstractGatewayResponse {
    @ApiProperty({ type: AgentGetResponseValueDto })
    value!: AgentGetResponseValueDto;
}
