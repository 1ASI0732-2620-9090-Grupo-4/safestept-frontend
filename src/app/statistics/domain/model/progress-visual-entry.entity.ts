import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class ProgressVisualEntry implements BaseEntity<number> {
  private _id: number;
  private _simulationId: string;
  private _scenarioName: string;
  private _completionPercentage: number;
  private _bestScore: number;
  private _averageScore: number;
  private _totalAttempts: number;
  private _commonErrors: string[];
  private _averageResponseTime: number;

  constructor(data: {
    id: number;
    simulationId: string;
    scenarioName: string;
    completionPercentage: number;
    bestScore: number;
    averageScore: number;
    totalAttempts: number;
    commonErrors: string[];
    averageResponseTime: number;
  }) {
    this._id = data.id;
    this._simulationId = data.simulationId;
    this._scenarioName = data.scenarioName;
    this._completionPercentage = data.completionPercentage;
    this._bestScore = data.bestScore;
    this._averageScore = data.averageScore;
    this._totalAttempts = data.totalAttempts;
    this._commonErrors = [...data.commonErrors];
    this._averageResponseTime = data.averageResponseTime;
  }

  get id(): number { return this._id; }
  get simulationId(): string { return this._simulationId; }
  get scenarioName(): string { return this._scenarioName; }
  get completionPercentage(): number { return this._completionPercentage; }
  get bestScore(): number { return this._bestScore; }
  get averageScore(): number { return this._averageScore; }
  get totalAttempts(): number { return this._totalAttempts; }
  get commonErrors(): string[] { return [...this._commonErrors]; }
  get averageResponseTime(): number { return this._averageResponseTime; }
}
