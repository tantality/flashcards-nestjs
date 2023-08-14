import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CardsRepository } from './cards.repository';
import { AllCardsResponseDto, GetAllCardsQueryDto } from './dto';

@Injectable()
export class CardsService {
  constructor(private cardsRepository: CardsRepository) {}

  findAndCountAll = async (userId: ObjectId, query: GetAllCardsQueryDto): Promise<AllCardsResponseDto> => {
    const cardsAndTheirCount = await this.cardsRepository.findAndCountAll(userId, query);
    return cardsAndTheirCount;
  };
}
