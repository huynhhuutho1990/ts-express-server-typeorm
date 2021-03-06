import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export interface GeneratedRequestNumber {
  uuid: string;
  requestNumber: string;
}

export default function generateRequestNumber(): GeneratedRequestNumber {
  const date = moment().format('YYYYMMDD');
  const uuid = uuidv4();
  const partialUUID = uuid.substr(0, 8).toUpperCase(); // get first part of uuid;

  return {
    uuid,
    requestNumber: `${date}-${partialUUID}`
  };
}
