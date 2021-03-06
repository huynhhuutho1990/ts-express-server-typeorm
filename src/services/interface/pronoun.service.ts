import IBaseService from './base.service';
import { Pronoun } from '../../database/entities/pronoun.entity';

export default interface IPronounService extends IBaseService<Pronoun> {}
