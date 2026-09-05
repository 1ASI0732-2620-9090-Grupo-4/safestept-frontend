import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { SimulationAttempt } from '../domain/model/simulation-attempt.entity';
import { SimulationAttemptsResponse, SimulationAttemptResource } from './simulation-attempts-response';
import { SimulationAttemptAssembler } from './simulation-attempt.assembler';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SimulationAttemptsApiEndpoint extends BaseApiEndpoint<
  SimulationAttempt,
  SimulationAttemptResource,
  SimulationAttemptsResponse,
  SimulationAttemptAssembler
> {
  constructor() {
    const http = inject(HttpClient);
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.medicalSimulationsEndpointPath}/simulations/attempts/me`,
      new SimulationAttemptAssembler(),
    );
  }

  createForSimulation(simulationId: string, attempt: SimulationAttempt): Observable<SimulationAttempt> {
    const resource = {
      mode: attempt.mode,
      startedAt: attempt.startedAt,
      completedAt: attempt.completedAt,
      score: attempt.score,
      totalSteps: attempt.totalSteps,
      correctSteps: attempt.correctSteps,
      timeElapsed: attempt.timeElapsed,
      errors: attempt.errors.map((error) => ({ ...error })),
    };
    return this.http
      .post<SimulationAttemptResource>(
        `${environment.platformProviderApiBaseUrl}${environment.medicalSimulationsEndpointPath}/simulations/${simulationId}/attempts`,
        resource,
      )
      .pipe(map((created) => this.assembler.toEntityFromResource(created)));
  }
}
