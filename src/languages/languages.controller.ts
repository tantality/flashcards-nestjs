/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable require-await */
import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common/decorators';
import { ObjectId } from 'mongoose';
import { CreateLanguageDto, GetAllLanguagesQueryDto, UpdateLanguageDto } from './dto';

@Controller('languages')
export class LanguagesController {
  @Get()
  async getAllLanguages(@Query() query: GetAllLanguagesQueryDto): Promise<void> {}

  @Get(':id')
  async getLanguage(@Param('id') id: ObjectId): Promise<void> {}

  @Post()
  async createLanguage(@Body() createLanguageDto: CreateLanguageDto): Promise<void> {}

  @Patch(':id')
  async updateLanguage(@Param('id') id: ObjectId, @Body() updateLanguageDto: UpdateLanguageDto): Promise<void> {}

  @Delete(':id')
  async deleteLanguage(@Param('id') id: ObjectId): Promise<void> {}
}

