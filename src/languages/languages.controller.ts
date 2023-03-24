import { Controller, NotFoundException } from '@nestjs/common';
import { Body, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common/decorators';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { CONTROLLER_HANDLERS_ACTIONS, LanguageExceptionMessages } from 'src/common/constants';
import { SerializerInterceptor } from 'src/common/interceptors';
import { ParseObjectIdPipe } from '../common/pipes';
import { CreateLanguageDto, GetAllLanguagesQueryDto, LanguageResponseDto, UpdateLanguageDto } from './dto';
import { Language } from './language.schema';
import { LANGUAGE_DTO_PROPERTY_DESCRIPTIONS } from './languages.constants';
import { LanguagesService } from './languages.service';

@ApiTags('languages')
@Controller('languages')
export class LanguagesController {
  constructor(private languagesService: LanguagesService) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of languages' })
  async getAllLanguages(@Query() query: GetAllLanguagesQueryDto): Promise<{ count: number; languages: Language[] }> {
    const languagesAndTheirCount = await this.languagesService.findAndCountAll(query);
    return languagesAndTheirCount;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a language' })
  @ApiParam({ name: 'id', type: String, description: LANGUAGE_DTO_PROPERTY_DESCRIPTIONS.ID + CONTROLLER_HANDLERS_ACTIONS.GET })
  @UseInterceptors(new SerializerInterceptor(LanguageResponseDto))
  async getLanguage(@Param('id', ParseObjectIdPipe) id: ObjectId): Promise<LanguageResponseDto> {
    const language = await this.languagesService.findOne({ _id: id });
    if (!language) {
      throw new NotFoundException(LanguageExceptionMessages.NOT_FOUND);
    }

    return language;
  }

  @Post()
  @ApiOperation({ summary: 'Create a language' })
  @UseInterceptors(new SerializerInterceptor(LanguageResponseDto))
  async createLanguage(@Body() createLanguageDto: CreateLanguageDto): Promise<LanguageResponseDto> {
    const createdLanguage = await this.languagesService.create(createLanguageDto);
    return createdLanguage;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing language' })
  @ApiParam({ name: 'id', type: String, description: LANGUAGE_DTO_PROPERTY_DESCRIPTIONS.ID + CONTROLLER_HANDLERS_ACTIONS.UPDATE })
  @UseInterceptors(new SerializerInterceptor(LanguageResponseDto))
  async updateLanguage(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
      @Body() updateLanguageDto: UpdateLanguageDto,
  ): Promise<LanguageResponseDto> {
    const updatedLanguage = await this.languagesService.update(id, updateLanguageDto);
    return updatedLanguage;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a language' })
  @ApiParam({ name: 'id', type: String, description: LANGUAGE_DTO_PROPERTY_DESCRIPTIONS.ID + CONTROLLER_HANDLERS_ACTIONS.DELETE })
  async deleteLanguage(@Param('id', ParseObjectIdPipe) id: ObjectId): Promise<void> {
    await this.languagesService.delete(id);
  }
}
