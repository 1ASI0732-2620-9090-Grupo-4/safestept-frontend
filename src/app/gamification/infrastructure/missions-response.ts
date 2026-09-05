import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface MissionsResponse extends BaseResponse {
  missions: MissionResource[];
}

export interface MissionResource extends BaseResource<string> {
  title: string;
  cadence: 'Diaria' | 'Semanal';
  progress: number;
  goal: number;
  rewardXp: number;
  rewardCoins: number;
  status?: 'Activa' | 'Disponible' | 'Bloqueada';
  instructions?: string;
  unlockRequirement?: string;
}
