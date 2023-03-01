/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable require-await */
import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Patch, Post, Query, UsePipes } from '@nestjs/common/decorators';
import { ObjectId } from 'mongoose';
import { ParseObjectIdPipe, ValidationPipe } from 'src/common/pipes';
import { CreateLanguageDto, GetAllLanguagesQueryDto, UpdateLanguageDto } from './dto';

@Controller('languages')
export class LanguagesController {
  @Get()
  @UsePipes(new ValidationPipe())
  async getAllLanguages(@Query() query: GetAllLanguagesQueryDto): Promise<void> {}

  @Get(':id')
  async getLanguage(@Param('id', ParseObjectIdPipe) id: ObjectId): Promise<void> {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createLanguage(@Body() createLanguageDto: CreateLanguageDto): Promise<void> {}

  @Patch(':id')
  async updateLanguage(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
      @Body(new ValidationPipe()) updateLanguageDto: UpdateLanguageDto,
  ): Promise<void> {}

  @Delete(':id')
  async deleteLanguage(@Param('id', ParseObjectIdPipe) id: ObjectId): Promise<void> {}
}

