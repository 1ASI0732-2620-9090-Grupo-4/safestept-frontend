import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import { ProductSuggestionResource } from './product-suggestion-response';

export interface MedicalSimulationsResponse extends BaseResponse {
  simulations: MedicalSimulationResource[];
}

export interface MedicalSimulationResource extends BaseResource<string> {
  title: string;
  emergencyType: string;
  difficulty: 'Basico' | 'Intermedio' | 'Avanzado';
  durationMinutes: number;
  xpReward: number;
  coinReward: number;
  imageUrl: string;
  status: 'Disponible' | 'En progreso' | 'Completado';
  completion: number;
  description: string;
  learningGoals: string[];
  steps: SimulationStepResource[];
  productSuggestions: ProductSuggestionResource[];
}

export interface SimulationStepResource {
  id: string;
  prompt: string;
  correctOptionId: string;
  options: Array<{
    id: string;
    label: string;
    feedback: string;
  }>;
}
