import { BaseEntity } from '../../../shared/infrastructure/base-entity';
import { RecommendationEntry } from './recommendation-entry.entity';
import { ProgressVisualEntry } from './progress-visual-entry.entity';
import { CertificateEntry } from './certificate-entry.entity';

export class StatisticsData implements BaseEntity<number> {
  private _id: number;
  private _recommendations: RecommendationEntry[];
  private _progressVisuals: ProgressVisualEntry[];
  private _certificates: CertificateEntry[];

  constructor(data: {
    id: number;
    recommendations?: RecommendationEntry[];
    progressVisuals?: ProgressVisualEntry[];
    certificates?: CertificateEntry[];
  }) {
    this._id = data.id;
    this._recommendations = data.recommendations ? [...data.recommendations] : [];
    this._progressVisuals = data.progressVisuals ? [...data.progressVisuals] : [];
    this._certificates = data.certificates ? [...data.certificates] : [];
  }

  get id(): number { return this._id; }
  get recommendations(): RecommendationEntry[] { return [...this._recommendations]; }
  get progressVisuals(): ProgressVisualEntry[] { return [...this._progressVisuals]; }
  get certificates(): CertificateEntry[] { return [...this._certificates]; }
}
