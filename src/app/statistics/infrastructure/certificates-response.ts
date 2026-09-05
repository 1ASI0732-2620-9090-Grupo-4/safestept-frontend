import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface CertificatesResponse extends BaseResponse {
  certificates: CertificateResource[];
}

export interface CertificateResource extends BaseResource<number> {
  moduleName: string;
  score: number;
  achievementLevel: string;
  verificationCode: string;
}
