import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { MedicalSimulationsApiEndpoint } from './medical-simulations-api-endpoint';
import { SimulationAttemptsApiEndpoint } from './simulation-attempts-api-endpoint';
import { MedicalSimulation } from '../domain/model/medical-simulation.entity';
import { SimulationAttempt } from '../domain/model/simulation-attempt.entity';

@Injectable({ providedIn: 'root' })
export class MedicalSimulationApi extends BaseApi {
  private readonly medicalSimulationsEndpoint: MedicalSimulationsApiEndpoint;
  private readonly simulationAttemptsEndpoint: SimulationAttemptsApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.medicalSimulationsEndpoint = new MedicalSimulationsApiEndpoint();
    this.simulationAttemptsEndpoint = new SimulationAttemptsApiEndpoint();
  }

  getSimulations(): Observable<MedicalSimulation[]> { return this.medicalSimulationsEndpoint.getAll(); }
  getAttempts(): Observable<SimulationAttempt[]> { return this.simulationAttemptsEndpoint.getAll(); }
  createSimulation(simulation: MedicalSimulation): Observable<MedicalSimulation> { return this.medicalSimulationsEndpoint.create(simulation); }
  updateSimulation(simulation: MedicalSimulation, id: string): Observable<MedicalSimulation> { return this.medicalSimulationsEndpoint.update(simulation, id); }
  deleteSimulation(id: string): Observable<void> { return this.medicalSimulationsEndpoint.delete(id); }
  createAttempt(attempt: SimulationAttempt): Observable<SimulationAttempt> {
    return this.simulationAttemptsEndpoint.createForSimulation(attempt.scenarioSlug ?? attempt.scenarioId.toString(), attempt);
  }
}
