import IBaseService from './base.service';
import { Occasion } from '../../database/entities/occasion.entity';

export default interface IOccasionService extends IBaseService<Occasion> {}
