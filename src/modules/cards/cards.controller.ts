/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable require-await */
import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RESPONSE_STATUS_DESCRIPTION } from 'src/common/constants';
import { CurrentUser } from 'src/common/decorators';
import { SerializerInterceptor } from 'src/common/interceptors';
import { DecodedUserJwtPayload } from '../auth/types';
import { CardsService } from './cards.service';
import { AllCardsResponseDto, GetAllCardsQueryDto } from './dto';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of cards' })
  @ApiBadRequestResponse({ description: RESPONSE_STATUS_DESCRIPTION.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: RESPONSE_STATUS_DESCRIPTION.UNAUTHORIZED })
  @UseInterceptors(new SerializerInterceptor(AllCardsResponseDto))
  async getAllCards(@CurrentUser() payload: DecodedUserJwtPayload, @Query() query: GetAllCardsQueryDto): Promise<AllCardsResponseDto> {
    const cardsAndTheirCount = await this.cardsService.findAndCountAll(payload.userId, query);
    return cardsAndTheirCount;
  }
}
