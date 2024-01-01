import { IsString } from 'class-validator';

export class KakaoRedirectInput {
  @IsString()
  code: string;
}
