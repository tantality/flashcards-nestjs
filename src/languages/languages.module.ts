import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Language, LanguageSchema } from './language.schema';
import { LanguagesController } from './languages.controller';
import { LanguagesRepository } from './languages.repository';
import { LanguagesService } from './languages.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Language.name, schema: LanguageSchema }])],
  controllers: [LanguagesController],
  providers: [LanguagesService, LanguagesRepository],
  exports: [LanguagesService, MongooseModule],
})
export class LanguagesModule {}

