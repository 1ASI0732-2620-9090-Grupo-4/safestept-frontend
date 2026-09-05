import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class SimulationStep implements BaseEntity<string> {
  private _id: string;
  private _prompt: string;
  private _correctOptionId: string;
  private _options: Array<{ id: string; label: string; feedback: string }>;

  constructor(simulationStep: {
    id: string;
    prompt: string;
    correctOptionId: string;
    options: Array<{ id: string; label: string; feedback: string }>;
  }) {
    this._id = simulationStep.id;
    this._prompt = simulationStep.prompt;
    this._correctOptionId = simulationStep.correctOptionId;
    this._options = simulationStep.options.map((o) => ({ ...o }));
  }

  get id(): string { return this._id; }
  get prompt(): string { return this._prompt; }
  get correctOptionId(): string { return this._correctOptionId; }
  get options(): Array<{ id: string; label: string; feedback: string }> { return [...this._options]; }
}
