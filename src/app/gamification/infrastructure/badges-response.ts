import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface BadgesResponse extends BaseResponse {
  badges: BadgeResource[];
}

export interface BadgeResource extends BaseResource<string> {
  name: string;
  rarity: string;
  unlocked: boolean;
  description: string;
  unlockRequirement?: string;
}
