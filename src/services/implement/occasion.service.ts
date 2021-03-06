import BaseService from './base.service';
import { Occasion } from '../../database/entities/occasion.entity';
import IOccasionService from '../interface/occasion.service';

export default class OccasionService extends BaseService<Occasion> implements IOccasionService {
  protected getEntityClass(): new () => Occasion {
    return Occasion;
  }

  async getByExternalId(external_id: string, withDeleted = false): Promise<Occasion> {
    return this.repository.findOne({ external_id }, { withDeleted: withDeleted });
  }

  async getAllWithOrder(): Promise<Occasion[]> {
    return this.repository.find({ order: { order: 'ASC' } });
  }
}
