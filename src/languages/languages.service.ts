import { BadRequestException, Injectable } from '@nestjs/common';
import { ObjectId, FilterQuery } from 'mongoose';
import { LanguageExceptionMessages } from 'src/common/constants';
import { CreateLanguageDto, GetAllLanguagesQueryDto, UpdateLanguageDto } from './dto';
import { Language } from './language.schema';
import { LanguagesRepository } from './languages.repository';

@Injectable()
export class LanguagesService {
  constructor(private languagesRepository: LanguagesRepository) {}

  findAndCountAll = async (query: GetAllLanguagesQueryDto): Promise<{ count: number; languages: Language[] }> => {
    const languagesAndTheirCount = await this.languagesRepository.findAndCountAll(query);
    return languagesAndTheirCount;
  };

  create = async (createLanguageDto: CreateLanguageDto): Promise<Language> => {
    const language = await this.findOne({ code: createLanguageDto.code });
    if (language) {
      throw new BadRequestException(LanguageExceptionMessages.ALREADY_EXISTS);
    }

    const createdLanguage = await this.languagesRepository.create(createLanguageDto);

    return createdLanguage;
  };

  update = async (id: ObjectId, updateLanguageDto: UpdateLanguageDto): Promise<Language> => {
    const updatedLanguage = await this.languagesRepository.update(id, updateLanguageDto);
    return updatedLanguage;
  };

  delete = async (id: ObjectId): Promise<void> => {
    await this.languagesRepository.delete(id);
  };

  findOne = async (condition: FilterQuery<Language>): Promise<Language | null> => {
    const language = await this.languagesRepository.findOne(condition);
    return language;
  };
}

