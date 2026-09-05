import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class CertificateEntry implements BaseEntity<number> {
  private _id: number;
  private _moduleName: string;
  private _score: number;
  private _achievementLevel: string;
  private _verificationCode: string;

  constructor(data: {
    id: number;
    moduleName: string;
    score: number;
    achievementLevel: string;
    verificationCode: string;
  }) {
    this._id = data.id;
    this._moduleName = data.moduleName;
    this._score = data.score;
    this._achievementLevel = data.achievementLevel;
    this._verificationCode = data.verificationCode;
  }

  get id(): number { return this._id; }
  get moduleName(): string { return this._moduleName; }
  get score(): number { return this._score; }
  get achievementLevel(): string { return this._achievementLevel; }
  get verificationCode(): string { return this._verificationCode; }
}
