import { BaseEntity } from '../../../shared/infrastructure/base-entity';
import { SimulationStep } from './simulation-step.entity';
import { ProductSuggestion } from './product-suggestion.entity';

export type Difficulty = 'Basico' | 'Intermedio' | 'Avanzado';
export type SimulationStatus = 'Disponible' | 'En progreso' | 'Completado';

export class MedicalSimulation implements BaseEntity<string> {
  private _id: string;
  private _title: string;
  private _emergencyType: string;
  private _difficulty: Difficulty;
  private _durationMinutes: number;
  private _xpReward: number;
  private _coinReward: number;
  private _imageUrl: string;
  private _status: SimulationStatus;
  private _completion: number;
  private _description: string;
  private _learningGoals: string[];
  private _steps: SimulationStep[];
  private _productSuggestions: ProductSuggestion[];

  constructor(medicalSimulation: {
    id: string;
    title: string;
    emergencyType: string;
    difficulty: Difficulty;
    durationMinutes: number;
    xpReward: number;
    coinReward: number;
    imageUrl: string;
    status: SimulationStatus;
    completion: number;
    description: string;
    learningGoals: string[];
    steps: Array<{ id: string; prompt: string; correctOptionId: string; options: Array<{ id: string; label: string; feedback: string }> }>;
    productSuggestions: ProductSuggestion[];
  }) {
    this._id = medicalSimulation.id;
    this._title = medicalSimulation.title;
    this._emergencyType = medicalSimulation.emergencyType;
    this._difficulty = medicalSimulation.difficulty;
    this._durationMinutes = medicalSimulation.durationMinutes;
    this._xpReward = medicalSimulation.xpReward;
    this._coinReward = medicalSimulation.coinReward;
    this._imageUrl = medicalSimulation.imageUrl;
    this._status = medicalSimulation.status;
    this._completion = medicalSimulation.completion;
    this._description = medicalSimulation.description;
    this._learningGoals = [...medicalSimulation.learningGoals];
    this._steps = medicalSimulation.steps.map((s) => new SimulationStep({ ...s }));
    this._productSuggestions = medicalSimulation.productSuggestions.map((s) => new ProductSuggestion({ productId: s.productId, reason: s.reason }));
  }

  get id(): string { return this._id; }
  get title(): string { return this._title; }
  get emergencyType(): string { return this._emergencyType; }
  get difficulty(): Difficulty { return this._difficulty; }
  get durationMinutes(): number { return this._durationMinutes; }
  get xpReward(): number { return this._xpReward; }
  get coinReward(): number { return this._coinReward; }
  get imageUrl(): string { return this._imageUrl; }
  get status(): SimulationStatus { return this._status; }
  get completion(): number { return this._completion; }
  get description(): string { return this._description; }
  get learningGoals(): string[] { return [...this._learningGoals]; }
  get steps(): SimulationStep[] { return [...this._steps]; }
  get productSuggestions(): ProductSuggestion[] { return [...this._productSuggestions]; }
}
