import BaseService from './base.service';
import { Receipt } from '../../database/entities';
import IReceiptService from '../interface/receipt.service';

export default class ReceiptService extends BaseService<Receipt> implements IReceiptService {
  protected getEntityClass(): new () => Receipt {
    return Receipt;
  }

  getByPurchaseId(pid: string): Promise<Receipt> {
    return this.repository.findOne({ purchase_id: pid });
  }
}
