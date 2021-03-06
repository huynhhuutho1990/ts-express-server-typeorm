import BaseService from './base.service';
import { StorePriceProduct } from '../../database/entities';
import IStorePriceProductService from '../interface/store_price_product.service';

export default class StorePriceProductService
  extends BaseService<StorePriceProduct>
  implements IStorePriceProductService {
  protected getEntityClass(): new () => StorePriceProduct {
    return StorePriceProduct;
  }

  async getByExternalId(external_id: string, withDeleted = false): Promise<StorePriceProduct> {
    return this.repository.findOne({ external_id }, { withDeleted: withDeleted });
  }
}
