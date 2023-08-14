import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { REFRESH_TOKEN_LIFETIME_IN_MS } from '../auth.constants';

@Schema()
export class RefreshToken {
  @Prop({ type: String, index: true })
    value: string;

  @Prop({ type: Date, default: (): number => Date.now() + REFRESH_TOKEN_LIFETIME_IN_MS })
    expiresAt: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
