import IBaseService from './base.service';
import { Receipt } from '../../database/entities';

export default interface IReceiptService extends IBaseService<Receipt> {
  getByPurchaseId(pid: string): Promise<Receipt>;
}
