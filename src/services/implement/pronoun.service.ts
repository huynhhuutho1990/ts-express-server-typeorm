import BaseService from './base.service';
import { Pronoun } from '../../database/entities/pronoun.entity';
import IPronounService from '../interface/pronoun.service';

export default class PronounService extends BaseService<Pronoun> implements IPronounService {
  protected getEntityClass(): new () => Pronoun {
    return Pronoun;
  }

  async getByExternalId(external_id: string, withDeleted = false): Promise<Pronoun> {
    return this.repository.findOne({ external_id }, { withDeleted: withDeleted });
  }

  async getAllWithOrder(): Promise<Pronoun[]> {
    return this.repository.find({ order: { order: 'ASC' } });
  }
}
