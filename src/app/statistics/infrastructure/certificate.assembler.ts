import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { CertificateEntry } from '../domain/model/certificate-entry.entity';
import { CertificatesResponse, CertificateResource } from './certificates-response';

export class CertificateAssembler implements BaseAssembler<CertificateEntry, CertificateResource, CertificatesResponse> {
  toEntitiesFromResponse(response: CertificatesResponse): CertificateEntry[] {
    return response.certificates.map((r) => this.toEntityFromResource(r));
  }

  toEntityFromResource(resource: CertificateResource): CertificateEntry {
    return new CertificateEntry({ ...resource });
  }

  toResourceFromEntity(entity: CertificateEntry): CertificateResource {
    return {
      id: entity.id,
      moduleName: entity.moduleName,
      score: entity.score,
      achievementLevel: entity.achievementLevel,
      verificationCode: entity.verificationCode,
    };
  }
}
