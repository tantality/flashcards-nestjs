import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ObjectId, FilterQuery } from 'mongoose';
import { LANGUAGE_EXCEPTION_MESSAGES } from 'src/common/constants';
import { AllLanguagesResponseDto, CreateLanguageDto, GetAllLanguagesQueryDto, UpdateLanguageDto } from './dto';
import { Language } from './language.schema';
import { LanguagesRepository } from './languages.repository';

@Injectable()
export class LanguagesService {
  constructor(private languagesRepository: LanguagesRepository) {}

  findAndCountAll = async (query: GetAllLanguagesQueryDto): Promise<AllLanguagesResponseDto> => {
    const languagesAndTheirCount = await this.languagesRepository.findAndCountAll(query);
    return languagesAndTheirCount;
  };

  create = async (createLanguageDto: CreateLanguageDto): Promise<Language> => {
    const language = await this.findOne({ code: createLanguageDto.code });
    if (language) {
      throw new BadRequestException(LANGUAGE_EXCEPTION_MESSAGES.ALREADY_EXISTS);
    }

    const createdLanguage = await this.languagesRepository.create(createLanguageDto);

    return createdLanguage;
  };

  update = async (id: ObjectId, updateLanguageDto: UpdateLanguageDto): Promise<Language> => {
    const languageToUpdate = await this.findOne({ _id: id });
    if (!languageToUpdate) {
      throw new NotFoundException(LANGUAGE_EXCEPTION_MESSAGES.NOT_FOUND);
    }

    const { code } = updateLanguageDto;
    const language = code && (await this.findOne({ code }));
    if (language) {
      throw new BadRequestException(LANGUAGE_EXCEPTION_MESSAGES.ALREADY_EXISTS);
    }

    const updatedLanguage = await this.languagesRepository.update(id, updateLanguageDto);

    return updatedLanguage;
  };

  delete = async (id: ObjectId): Promise<void> => {
    const languageToDelete = await this.findOne({ _id: id });
    if (!languageToDelete) {
      throw new NotFoundException(LANGUAGE_EXCEPTION_MESSAGES.NOT_FOUND);
    }

    await this.languagesRepository.delete(id);
  };

  findOne = async (condition: FilterQuery<Language>): Promise<Language | null> => {
    const language = await this.languagesRepository.findOne(condition);
    return language;
  };
}

