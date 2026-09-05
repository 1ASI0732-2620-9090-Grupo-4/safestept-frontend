import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { StatisticsData } from '../domain/model/statistics-data.entity';
import { RecommendationEntry } from '../domain/model/recommendation-entry.entity';
import { ProgressVisualEntry } from '../domain/model/progress-visual-entry.entity';
import { CertificateEntry } from '../domain/model/certificate-entry.entity';
import { StatisticsDataResource, StatisticsDataResponse } from './statistics-data-response';
import { RecommendationResource } from './recommendations-response';
import { ProgressVisualResource } from './progress-visuals-response';
import { CertificateResource } from './certificates-response';

export class StatisticsDataAssembler implements BaseAssembler<StatisticsData, StatisticsDataResource, StatisticsDataResponse> {
  toEntitiesFromResponse(response: StatisticsDataResponse): StatisticsData[] {
    return [this.toEntityFromResource(response)];
  }

  toEntityFromResource(resource: StatisticsDataResource): StatisticsData {
    return new StatisticsData({
      id: resource.id,
      recommendations: (resource.recommendations ?? []).map((r: RecommendationResource) => new RecommendationEntry(r)),
      progressVisuals: (resource.progressVisuals ?? []).map((pv: ProgressVisualResource) => new ProgressVisualEntry(pv)),
      certificates: (resource.certificates ?? []).map((c: CertificateResource) => new CertificateEntry(c)),
    });
  }

  toResourceFromEntity(entity: StatisticsData): StatisticsDataResource {
    return {
      id: entity.id,
      recommendations: entity.recommendations.map((r) => ({
        id: r.id,
        title: r.title,
        action: r.action,
        priority: r.priority,
      })),
      progressVisuals: entity.progressVisuals.map((pv) => ({
        id: pv.id,
        simulationId: pv.simulationId,
        scenarioName: pv.scenarioName,
        completionPercentage: pv.completionPercentage,
        bestScore: pv.bestScore,
        averageScore: pv.averageScore,
        totalAttempts: pv.totalAttempts,
        commonErrors: [...pv.commonErrors],
        averageResponseTime: pv.averageResponseTime,
      })),
      certificates: entity.certificates.map((c) => ({
        id: c.id,
        moduleName: c.moduleName,
        score: c.score,
        achievementLevel: c.achievementLevel,
        verificationCode: c.verificationCode,
      })),
    };
  }
}
