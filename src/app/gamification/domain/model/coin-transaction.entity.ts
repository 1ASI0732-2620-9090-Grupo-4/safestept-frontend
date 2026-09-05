import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class CoinTransaction implements BaseEntity<string> {
  private _id: string;
  private _userId: string;
  private _simulationId: string;
  private _simulationTitle: string;
  private _attemptNumber: number;
  private _successfulAttemptNumber: number;
  private _baseCoins: number;
  private _multiplier: number;
  private _accuracy: number;
  private _earnedCoins: number;
  private _successful: boolean;
  private _createdAt: string;

  constructor(transaction: {
    id: string;
    userId: string;
    simulationId: string;
    simulationTitle: string;
    attemptNumber: number;
    successfulAttemptNumber: number;
    baseCoins: number;
    multiplier: number;
    accuracy: number;
    earnedCoins: number;
    successful: boolean;
    createdAt: string;
  }) {
    this._id = transaction.id;
    this._userId = transaction.userId;
    this._simulationId = transaction.simulationId;
    this._simulationTitle = transaction.simulationTitle;
    this._attemptNumber = transaction.attemptNumber;
    this._successfulAttemptNumber = transaction.successfulAttemptNumber;
    this._baseCoins = transaction.baseCoins;
    this._multiplier = transaction.multiplier;
    this._accuracy = transaction.accuracy;
    this._earnedCoins = transaction.earnedCoins;
    this._successful = transaction.successful;
    this._createdAt = transaction.createdAt;
  }

  get id(): string { return this._id; }
  set id(value: string) { this._id = value; }
  get userId(): string { return this._userId; }
  set userId(value: string) { this._userId = value; }
  get simulationId(): string { return this._simulationId; }
  set simulationId(value: string) { this._simulationId = value; }
  get simulationTitle(): string { return this._simulationTitle; }
  set simulationTitle(value: string) { this._simulationTitle = value; }
  get attemptNumber(): number { return this._attemptNumber; }
  set attemptNumber(value: number) { this._attemptNumber = value; }
  get successfulAttemptNumber(): number { return this._successfulAttemptNumber; }
  set successfulAttemptNumber(value: number) { this._successfulAttemptNumber = value; }
  get baseCoins(): number { return this._baseCoins; }
  set baseCoins(value: number) { this._baseCoins = value; }
  get multiplier(): number { return this._multiplier; }
  set multiplier(value: number) { this._multiplier = value; }
  get accuracy(): number { return this._accuracy; }
  set accuracy(value: number) { this._accuracy = value; }
  get earnedCoins(): number { return this._earnedCoins; }
  set earnedCoins(value: number) { this._earnedCoins = value; }
  get successful(): boolean { return this._successful; }
  set successful(value: boolean) { this._successful = value; }
  get createdAt(): string { return this._createdAt; }
  set createdAt(value: string) { this._createdAt = value; }
}
