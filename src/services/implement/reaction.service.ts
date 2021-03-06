import BaseService from './base.service';
import { Reaction } from '../../database/entities/reaction.entity';
import IReactionService from '../interface/reaction.service';

export default class ReactionService extends BaseService<Reaction> implements IReactionService {
  protected getEntityClass(): new () => Reaction {
    return Reaction;
  }
}
