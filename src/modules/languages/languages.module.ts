import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { Language, LanguageSchema } from './language.schema';
import { LanguagesController } from './languages.controller';
import { LanguagesRepository } from './languages.repository';
import { LanguagesService } from './languages.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Language.name, schema: LanguageSchema }]), forwardRef(() => UsersModule)],
  controllers: [LanguagesController],
  providers: [LanguagesService, LanguagesRepository],
  exports: [LanguagesService],
})
export class LanguagesModule {}
