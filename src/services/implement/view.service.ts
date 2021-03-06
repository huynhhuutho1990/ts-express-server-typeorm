import BaseService from './base.service';
import { View } from '../../database/entities/view.entity';
import IViewService from '../interface/view.service';

export default class ViewService extends BaseService<View> implements IViewService {
  protected getEntityClass(): new () => View {
    return View;
  }
}
