import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { MedicalSimulation } from '../domain/model/medical-simulation.entity';
import { MedicalSimulationsResponse, MedicalSimulationResource } from './medical-simulations-response';
import { MedicalSimulationAssembler } from './medical-simulation.assembler';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MedicalSimulationsApiEndpoint extends BaseApiEndpoint<
  MedicalSimulation,
  MedicalSimulationResource,
  MedicalSimulationsResponse,
  MedicalSimulationAssembler
> {
  constructor() {
    const http = inject(HttpClient);
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.medicalSimulationsEndpointPath}/simulations`,
      new MedicalSimulationAssembler(),
    );
  }
}
