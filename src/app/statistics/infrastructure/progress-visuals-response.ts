import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface ProgressVisualsResponse extends BaseResponse {
  progressVisuals: ProgressVisualResource[];
}

export interface ProgressVisualResource extends BaseResource<number> {
  simulationId: string;
  scenarioName: string;
  completionPercentage: number;
  bestScore: number;
  averageScore: number;
  totalAttempts: number;
  commonErrors: string[];
  averageResponseTime: number;
}
