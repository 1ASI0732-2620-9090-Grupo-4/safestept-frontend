import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { ProgressVisualEntry } from '../domain/model/progress-visual-entry.entity';
import { ProgressVisualsResponse, ProgressVisualResource } from './progress-visuals-response';

export class ProgressVisualAssembler implements BaseAssembler<ProgressVisualEntry, ProgressVisualResource, ProgressVisualsResponse> {
  toEntitiesFromResponse(response: ProgressVisualsResponse): ProgressVisualEntry[] {
    return response.progressVisuals.map((r) => this.toEntityFromResource(r));
  }

  toEntityFromResource(resource: ProgressVisualResource): ProgressVisualEntry {
    return new ProgressVisualEntry({ ...resource });
  }

  toResourceFromEntity(entity: ProgressVisualEntry): ProgressVisualResource {
    return {
      id: entity.id,
      simulationId: entity.simulationId,
      scenarioName: entity.scenarioName,
      completionPercentage: entity.completionPercentage,
      bestScore: entity.bestScore,
      averageScore: entity.averageScore,
      totalAttempts: entity.totalAttempts,
      commonErrors: [...entity.commonErrors],
      averageResponseTime: entity.averageResponseTime,
    };
  }
}
