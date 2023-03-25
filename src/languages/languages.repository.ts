import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId, FilterQuery, Model, Aggregate } from 'mongoose';
import { SORT_DIRECTION } from 'src/common/constants';
import { SortingConditionWithDirectionAsNumber } from 'src/common/types';
import { getSortDirectionAsNumber } from 'src/common/utils';
import { AllLanguagesResponseDto, CreateLanguageDto, GetAllLanguagesQueryDto, UpdateLanguageDto } from './dto';
import { Language, LanguageDocument } from './language.schema';
import { LANGUAGE_SORT_BY } from './languages.constants';

@Injectable()
export class LanguagesRepository {
  static LANGUAGE_FIELD_SELECTION_CONFIG: Record<string, number> = { _id: 1, code: 1, name: 1, createdAt: 1 };

  constructor(@InjectModel(Language.name) private languageModel: Model<LanguageDocument>) {}

  findAndCountAll = async (query: GetAllLanguagesQueryDto): Promise<AllLanguagesResponseDto> => {
    const { search, sortBy, sortDirection, limit, offset } = query;

    const findingCondition = this.createFindingConditionForLanguages(search);
    const sortingCondition = this.createSortingConditionForLanguages(sortBy, sortDirection);

    const languagesCountPromise = this.countAll(findingCondition);
    const languagesAggregate: Aggregate<Language[]> = this.languageModel.aggregate([
      { $match: findingCondition },
      { $addFields: { nameInLowercase: { $toLower: '$name' } } },
      { $project: { ...LanguagesRepository.LANGUAGE_FIELD_SELECTION_CONFIG, nameInLowercase: 1 } },
      { $sort: sortingCondition },
      { $unset: ['nameInLowercase'] },
      { $skip: offset },
      { $limit: limit },
    ]);

    const [count, languages] = await Promise.all([languagesCountPromise, languagesAggregate]);

    return { count, languages };
  };

  private createFindingConditionForLanguages = (search?: string): FilterQuery<Language> => {
    const searchByNameCondition = this.createSearchByNameCondition(search);

    const condition: FilterQuery<Language> = {
      ...searchByNameCondition,
    };

    return condition;
  };

  private createSearchByNameCondition = (search?: string): FilterQuery<Language> => {
    const searchCondition = search ? { $regex: new RegExp(search, 'i') } : null;
    const searchByNameCondition = searchCondition ? { name: searchCondition } : {};

    return searchByNameCondition;
  };

  private createSortingConditionForLanguages = (
    sortBy: LANGUAGE_SORT_BY,
    sortDirection: SORT_DIRECTION,
  ): SortingConditionWithDirectionAsNumber<Language> => {
    let sortingCondition: SortingConditionWithDirectionAsNumber<Language> = {};
    const sortDirectionAsNumber = getSortDirectionAsNumber(sortDirection);

    switch (sortBy) {
    case LANGUAGE_SORT_BY.NAME: {
      sortingCondition = { nameInLowercase: sortDirectionAsNumber };
      break;
    }
    case LANGUAGE_SORT_BY.DATE: {
      sortingCondition = { createdAt: sortDirectionAsNumber };
      break;
    }
    }

    return sortingCondition;
  };

  countAll = async (condition: FilterQuery<Language>): Promise<number> => {
    const count = await this.languageModel.where(condition).countDocuments();
    return count;
  };

  create = async (createLanguageDto: CreateLanguageDto): Promise<Language> => {
    const createdLanguage = await this.languageModel.create(createLanguageDto);
    return createdLanguage;
  };

  update = async (id: ObjectId, updateLanguageDto: UpdateLanguageDto): Promise<Language> => {
    await this.languageModel.updateOne({ _id: id }, { ...updateLanguageDto });

    const updatedLanguage = (await this.findOne({ _id: id })) as Language;

    return updatedLanguage;
  };

  findOne = async (condition: FilterQuery<Language>): Promise<Language | null> => {
    const language = await this.languageModel.findOne(condition);
    return language;
  };

  delete = async (id: ObjectId): Promise<void> => {
    await this.languageModel.deleteOne({ _id: id });
  };
}
