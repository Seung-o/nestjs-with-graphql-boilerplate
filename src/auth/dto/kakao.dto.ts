export class GetKakaoProfileDTO {
  code: string;
  clientId: string;
  redirectUri: string;
  clientSecret: string;
}

export class KakaoTokenInfo {
  /**
   * 토큰 타입, bearer 로 고정
   */
  token_type: string;

  /**
   * 액세스 토큰
   */
  access_token: string;

  /**
   * 액세스 토큰 만료 시간(초)
   */
  expires_in: number;

  /**
   * 리프레시 토큰
   */
  refresh_token: string;

  /**
   * 리프레시 토큰 만료 시간(초)
   */
  refresh_token_expires_in: number;

  /**
   * 앱에 부여된 사용자 리소스 접근 권한 범위
   */
  scope: string;
}

export class KakaoProfile {
  /**
   * 사용자 고유 ID
   */
  id: number;

  connected_at: string;

  properties: { nickname: string };

  /**
   * 사용자의 카카오계정 정보
   */
  kakao_account: {
    profile_needs_agreement: boolean;
    profile: { nickname: string };
    has_email: boolean;
    email_needs_agreement: boolean;
    is_email_valid: boolean;
    is_email_verified: boolean;
    email: string;
  };
}
