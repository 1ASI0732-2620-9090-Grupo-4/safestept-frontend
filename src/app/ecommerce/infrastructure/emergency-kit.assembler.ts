import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { EmergencyKit } from '../domain/model/emergency-kit.entity';
import { EmergencyKitsResponse, EmergencyKitResource } from './emergency-kits-response';

export class EmergencyKitAssembler implements BaseAssembler<EmergencyKit, EmergencyKitResource, EmergencyKitsResponse> {
  toEntitiesFromResponse(response: EmergencyKitsResponse): EmergencyKit[] { return response.emergencyKits.map((r) => this.toEntityFromResource(r)); }
  toEntityFromResource(resource: EmergencyKitResource): EmergencyKit { return new EmergencyKit({ ...resource, products: resource.products.map((p) => ({ ...p })) }); }
  toResourceFromEntity(entity: EmergencyKit): EmergencyKitResource { return { id: entity.id, name: entity.name, description: entity.description, level: entity.level, individualPrice: entity.individualPrice, kitPrice: entity.kitPrice, savings: entity.savings, savingsPercentage: entity.savingsPercentage, products: entity.products.map((p) => ({ ...p })), imageUrl: entity.imageUrl, isPopular: entity.isPopular }; }
}
