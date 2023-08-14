/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable require-await */
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AllCardsResponseDto, GetAllCardsQueryDto } from './dto';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  @Get()
  async getAllCards(@Query() query: GetAllCardsQueryDto): Promise<AllCardsResponseDto> {
    return {} as AllCardsResponseDto;
  }
}
