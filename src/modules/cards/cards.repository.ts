/* eslint-disable require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, SchemaTypes } from 'mongoose';
import { Card, CardDocument } from './card.schema';
import { GetAllCardsQueryDto, AllCardsResponseDto } from './dto';

@Injectable()
export class CardsRepository {
  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) {}

  MOCK_CARD: Card = {
    _id: new SchemaTypes.ObjectId('63bca3bacef11ea37e9a4e53'),
    userId: new SchemaTypes.ObjectId('63bca3bacef11ea37e9a4e53'),
    nativeLanguageId: new SchemaTypes.ObjectId('63bca3bacef11ea37e9a4e53'),
    nativeWords: ['hi', 'hello'],
    foreignLanguageId: new SchemaTypes.ObjectId('63bca3bacef11ea37e9a4e53'),
    foreignWords: ['привет'],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  CARDS_SET = {
    count: 1,
    cards: [this.MOCK_CARD],
  } as AllCardsResponseDto;

  findAndCountAll = async (userId: ObjectId, query: GetAllCardsQueryDto): Promise<AllCardsResponseDto> => {
    return this.CARDS_SET;
  };
}
