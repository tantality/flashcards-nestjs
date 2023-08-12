import { Controller, HttpStatus, NotFoundException } from '@nestjs/common';
import { Body, Delete, Get, HttpCode, Param, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { CONTROLLER_HANDLER_ACTION, LANGUAGE_EXCEPTION_MESSAGE, RESPONSE_STATUS_DESCRIPTION } from 'src/common/constants';
import { SerializerInterceptor } from 'src/common/interceptors';
import { ParseObjectIdPipe } from 'src/common/pipes';
import { Roles } from '../auth/decorators';
import { RolesGuard } from '../auth/guards';
import { USER_ROLE } from '../users/users.constants';
import { AllLanguagesResponseDto, CreateLanguageDto, GetAllLanguagesQueryDto, LanguageResponseDto, UpdateLanguageDto } from './dto';
import { LANGUAGE_DTO_PROPERTY_DESCRIPTION } from './languages.constants';
import { LanguagesService } from './languages.service';

@ApiTags('languages')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('languages')
export class LanguagesController {
  constructor(private languagesService: LanguagesService) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of languages' })
  @ApiBadRequestResponse({ description: RESPONSE_STATUS_DESCRIPTION.BAD_REQUEST })
  @UseInterceptors(new SerializerInterceptor(AllLanguagesResponseDto))
  async getAllLanguages(@Query() query: GetAllLanguagesQueryDto): Promise<AllLanguagesResponseDto> {
    const languagesAndTheirCount = await this.languagesService.findAndCountAll(query);
    return languagesAndTheirCount;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a language' })
  @ApiBadRequestResponse({ description: RESPONSE_STATUS_DESCRIPTION.BAD_REQUEST })
  @ApiNotFoundResponse({ description: RESPONSE_STATUS_DESCRIPTION.NOT_FOUND })
  @ApiParam({ name: 'id', type: String, description: LANGUAGE_DTO_PROPERTY_DESCRIPTION.ID + CONTROLLER_HANDLER_ACTION.GET })
  @UseInterceptors(new SerializerInterceptor(LanguageResponseDto))
  async getLanguage(@Param('id', ParseObjectIdPipe) id: ObjectId): Promise<LanguageResponseDto> {
    const language = await this.languagesService.findOne({ _id: id });
    if (!language) {
      throw new NotFoundException(LANGUAGE_EXCEPTION_MESSAGE.NOT_FOUND);
    }

    return language;
  }

  @Post()
  @ApiOperation({ summary: 'Create a language' })
  @ApiBadRequestResponse({ description: RESPONSE_STATUS_DESCRIPTION.BAD_REQUEST })
  @Roles(USER_ROLE.ADMIN)
  @UseInterceptors(new SerializerInterceptor(LanguageResponseDto))
  async createLanguage(@Body() createLanguageDto: CreateLanguageDto): Promise<LanguageResponseDto> {
    const createdLanguage = await this.languagesService.create(createLanguageDto);
    return createdLanguage;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing language' })
  @ApiBadRequestResponse({ description: RESPONSE_STATUS_DESCRIPTION.BAD_REQUEST })
  @ApiNotFoundResponse({ description: RESPONSE_STATUS_DESCRIPTION.NOT_FOUND })
  @ApiParam({ name: 'id', type: String, description: LANGUAGE_DTO_PROPERTY_DESCRIPTION.ID + CONTROLLER_HANDLER_ACTION.UPDATE })
  @Roles(USER_ROLE.ADMIN)
  @UseInterceptors(new SerializerInterceptor(LanguageResponseDto))
  async updateLanguage(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
      @Body() updateLanguageDto: UpdateLanguageDto,
  ): Promise<LanguageResponseDto> {
    const updatedLanguage = await this.languagesService.update(id, updateLanguageDto);
    return updatedLanguage;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a language' })
  @ApiNoContentResponse({ description: RESPONSE_STATUS_DESCRIPTION.NO_CONTENT })
  @ApiBadRequestResponse({ description: RESPONSE_STATUS_DESCRIPTION.BAD_REQUEST })
  @ApiNotFoundResponse({ description: RESPONSE_STATUS_DESCRIPTION.NOT_FOUND })
  @ApiParam({ name: 'id', type: String, description: LANGUAGE_DTO_PROPERTY_DESCRIPTION.ID + CONTROLLER_HANDLER_ACTION.DELETE })
  @Roles(USER_ROLE.ADMIN)
  async deleteLanguage(@Param('id', ParseObjectIdPipe) id: ObjectId): Promise<void> {
    await this.languagesService.delete(id);
  }
}
