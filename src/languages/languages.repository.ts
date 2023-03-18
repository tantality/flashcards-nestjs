/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId, FilterQuery, Model } from 'mongoose';
import { CreateLanguageDto, GetAllLanguagesQueryDto, UpdateLanguageDto } from './dto';
import { Language, LanguageDocument } from './language.schema';

@Injectable()
export class LanguagesRepository {
  constructor(@InjectModel(Language.name) private languageModel: Model<LanguageDocument>) {}

  mockLanguage: Language = {
    _id: '21' as unknown as ObjectId,
    code: 'eng',
    name: 'english',
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Language;

  findAndCountAll = async (query: GetAllLanguagesQueryDto): Promise<{ count: number; languages: Language[] }> => {
    return { count: 2, languages: [this.mockLanguage] };
  };

  create = async (createLanguageDto: CreateLanguageDto): Promise<Language> => {
    const createdLanguage = await this.languageModel.create(createLanguageDto);
    return createdLanguage;
  };

  update = async (id: ObjectId, updateLanguageDto: UpdateLanguageDto): Promise<Language> => {
    return this.mockLanguage;
  };

  findOne = async (condition: FilterQuery<Language>): Promise<Language | null> => {
    const language = await this.languageModel.findOne(condition);
    return language;
  };

  delete = async (id: ObjectId): Promise<void> => {};
}
