import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { AUTH_RESPONSE_DTO_PROPERTY_EXAMPLES } from '../auth.constants';

export class AuthResponseDto {
  @ApiProperty({ example: AUTH_RESPONSE_DTO_PROPERTY_EXAMPLES.USER_ID, type: String })
  readonly userId: ObjectId;

  @ApiProperty({ example: AUTH_RESPONSE_DTO_PROPERTY_EXAMPLES.ACCESS_TOKEN })
  readonly accessToken: string;

  @ApiProperty({ example: AUTH_RESPONSE_DTO_PROPERTY_EXAMPLES.REFRESH_TOKEN })
  readonly refreshToken: string;
}
