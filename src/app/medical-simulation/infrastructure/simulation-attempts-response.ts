import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface SimulationAttemptsResponse extends BaseResponse {
  attempts: SimulationAttemptResource[];
}

export interface SimulationAttemptResource extends BaseResource<number> {
  userId: number;
  scenarioId: number;
  scenarioSlug?: string;
  mode: string;
  startedAt?: string;
  completedAt?: string;
  score: number;
  totalSteps: number;
  correctSteps: number;
  timeElapsed: number;
  errors: Array<{ stepNumber: number; error: string; severity: string }>;
}
