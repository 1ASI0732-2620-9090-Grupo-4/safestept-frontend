import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { SimulationAttempt } from '../domain/model/simulation-attempt.entity';
import { SimulationAttemptsResponse, SimulationAttemptResource } from './simulation-attempts-response';

export class SimulationAttemptAssembler implements BaseAssembler<SimulationAttempt, SimulationAttemptResource, SimulationAttemptsResponse> {
  toEntitiesFromResponse(response: SimulationAttemptsResponse): SimulationAttempt[] {
    return response.attempts.map((r) => this.toEntityFromResource(r));
  }
  toEntityFromResource(resource: SimulationAttemptResource): SimulationAttempt {
    return new SimulationAttempt({ ...resource, errors: resource.errors.map((e) => ({ ...e })) });
  }
  toResourceFromEntity(entity: SimulationAttempt): SimulationAttemptResource {
    return {
      id: entity.id,
      userId: entity.userId,
      scenarioId: entity.scenarioId,
      scenarioSlug: entity.scenarioSlug,
      mode: entity.mode,
      startedAt: entity.startedAt,
      completedAt: entity.completedAt,
      score: entity.score,
      totalSteps: entity.totalSteps,
      correctSteps: entity.correctSteps,
      timeElapsed: entity.timeElapsed,
      errors: entity.errors.map((e) => ({ ...e })),
    };
  }
}
