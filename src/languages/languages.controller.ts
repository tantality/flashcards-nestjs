/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common/decorators';
import { ObjectId } from 'mongoose';
import { SerializerInterceptor } from 'src/common/interceptors';
import { ParseObjectIdPipe } from '../common/pipes';
import { CreateLanguageDto, GetAllLanguagesQueryDto, LanguageResponseDto, UpdateLanguageDto } from './dto';
import { Language } from './language.schema';
import { LanguagesService } from './languages.service';

@Controller('languages')
export class LanguagesController {
  constructor(private languagesService: LanguagesService) {}

  @Get()
  async getAllLanguages(@Query() query: GetAllLanguagesQueryDto): Promise<{ count: number; languages: Language[] }> {
    const languagesAndTheirCount = await this.languagesService.findAndCountAll(query);
    return languagesAndTheirCount;
  }

  @Get(':id')
  @UseInterceptors(new SerializerInterceptor(LanguageResponseDto))
  async getLanguage(@Param('id', ParseObjectIdPipe) id: ObjectId): Promise<LanguageResponseDto> {
    const language = (await this.languagesService.findOne(id)) as Language;
    return language;
  }

  @Post()
  @UseInterceptors(new SerializerInterceptor(LanguageResponseDto))
  async createLanguage(@Body() createLanguageDto: CreateLanguageDto): Promise<LanguageResponseDto> {
    const createdLanguage = await this.languagesService.create(createLanguageDto);
    return createdLanguage;
  }

  @Patch(':id')
  @UseInterceptors(new SerializerInterceptor(LanguageResponseDto))
  async updateLanguage(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
      @Body() updateLanguageDto: UpdateLanguageDto,
  ): Promise<LanguageResponseDto> {
    const updatedLanguage = await this.languagesService.update(id, updateLanguageDto);
    return updatedLanguage;
  }

  @Delete(':id')
  async deleteLanguage(@Param('id', ParseObjectIdPipe) id: ObjectId): Promise<void> {}
}

