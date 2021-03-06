import IBaseService from './base.service';
import { Reaction } from '../../database/entities/reaction.entity';

export default interface IReactionService extends IBaseService<Reaction> {}
