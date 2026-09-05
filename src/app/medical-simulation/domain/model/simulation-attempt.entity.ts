import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class SimulationAttempt implements BaseEntity<number> {
  private _id: number;
  private _userId: number;
  private _scenarioId: number;
  private _scenarioSlug?: string;
  private _mode: string;
  private _startedAt?: string;
  private _completedAt?: string;
  private _score: number;
  private _totalSteps: number;
  private _correctSteps: number;
  private _timeElapsed: number;
  private _errors: Array<{ stepNumber: number; error: string; severity: string }>;

  constructor(simulationAttempt: {
    id: number;
    userId: number;
    scenarioId: number;
    scenarioSlug?: string;
    mode: string;
    startedAt?: string;
    completedAt?: string;
    score: number;
    totalSteps: number;
    correctSteps: number;
    timeElapsed: number;
    errors: Array<{ stepNumber: number; error: string; severity: string }>;
  }) {
    this._id = simulationAttempt.id;
    this._userId = simulationAttempt.userId;
    this._scenarioId = simulationAttempt.scenarioId;
    this._scenarioSlug = simulationAttempt.scenarioSlug;
    this._mode = simulationAttempt.mode;
    this._startedAt = simulationAttempt.startedAt;
    this._completedAt = simulationAttempt.completedAt;
    this._score = simulationAttempt.score;
    this._totalSteps = simulationAttempt.totalSteps;
    this._correctSteps = simulationAttempt.correctSteps;
    this._timeElapsed = simulationAttempt.timeElapsed;
    this._errors = simulationAttempt.errors.map((e) => ({ ...e }));
  }

  get id(): number { return this._id; }
  get userId(): number { return this._userId; }
  get scenarioId(): number { return this._scenarioId; }
  get scenarioSlug(): string | undefined { return this._scenarioSlug; }
  get mode(): string { return this._mode; }
  get startedAt(): string | undefined { return this._startedAt; }
  get completedAt(): string | undefined { return this._completedAt; }
  get score(): number { return this._score; }
  get totalSteps(): number { return this._totalSteps; }
  get correctSteps(): number { return this._correctSteps; }
  get timeElapsed(): number { return this._timeElapsed; }
  get errors(): Array<{ stepNumber: number; error: string; severity: string }> { return [...this._errors]; }
}
