import IBaseService from './base.service';
import { StorePriceProduct } from '../../database/entities';

export default interface IStorePriceProductService extends IBaseService<StorePriceProduct> {
  getByExternalId(external_id: string, withDeleted?: boolean): Promise<StorePriceProduct>;
}
