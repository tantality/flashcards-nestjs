/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable require-await */
import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RESPONSE_STATUS_DESCRIPTION } from 'src/common/constants';
import { SerializerInterceptor } from 'src/common/interceptors';
import { AllCardsResponseDto, GetAllCardsQueryDto } from './dto';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  @Get()
  @ApiOperation({ summary: 'Get a list of cards' })
  @ApiBadRequestResponse({ description: RESPONSE_STATUS_DESCRIPTION.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: RESPONSE_STATUS_DESCRIPTION.UNAUTHORIZED })
  @UseInterceptors(new SerializerInterceptor(AllCardsResponseDto))
  async getAllCards(@Query() query: GetAllCardsQueryDto): Promise<AllCardsResponseDto> {
    return {} as AllCardsResponseDto;
  }
}
