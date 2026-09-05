import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { MedicalSimulation } from '../domain/model/medical-simulation.entity';
import { SimulationStep } from '../domain/model/simulation-step.entity';
import { ProductSuggestion } from '../domain/model/product-suggestion.entity';
import { MedicalSimulationsResponse, MedicalSimulationResource, SimulationStepResource } from './medical-simulations-response';
import { ProductSuggestionResource } from './product-suggestion-response';

export class MedicalSimulationAssembler implements BaseAssembler<MedicalSimulation, MedicalSimulationResource, MedicalSimulationsResponse> {
  toEntitiesFromResponse(response: MedicalSimulationsResponse): MedicalSimulation[] {
    return response.simulations.map((r) => this.toEntityFromResource(r));
  }
  toEntityFromResource(resource: MedicalSimulationResource): MedicalSimulation {
    return new MedicalSimulation({
      ...resource,
      learningGoals: [...resource.learningGoals],
      steps: resource.steps.map((step) => ({ ...step, options: step.options.map((o) => ({ ...o })) })),
      productSuggestions: resource.productSuggestions.map((s) => new ProductSuggestion({ ...s })),
    });
  }
  toResourceFromEntity(entity: MedicalSimulation): MedicalSimulationResource {
    return {
      id: entity.id,
      title: entity.title,
      emergencyType: entity.emergencyType,
      difficulty: entity.difficulty,
      durationMinutes: entity.durationMinutes,
      xpReward: entity.xpReward,
      coinReward: entity.coinReward,
      imageUrl: entity.imageUrl,
      status: entity.status,
      completion: entity.completion,
      description: entity.description,
      learningGoals: [...entity.learningGoals],
      steps: entity.steps.map((step) => this.toStepResource(step)),
      productSuggestions: entity.productSuggestions.map((s) => ({ productId: s.productId, reason: s.reason })),
    };
  }
  private toStepEntity(resource: SimulationStepResource): SimulationStep {
    return new SimulationStep({ ...resource, options: resource.options.map((o) => ({ ...o })) });
  }
  private toStepResource(entity: SimulationStep): SimulationStepResource {
    return { id: entity.id, prompt: entity.prompt, correctOptionId: entity.correctOptionId, options: entity.options.map((o) => ({ ...o })) };
  }
}
