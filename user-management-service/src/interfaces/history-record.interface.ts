import { EEvents } from 'src/constants/enums';

export interface IHistoryRecord {
  userId: string;
  event: EEvents;
  field: string | null;
  oldValue: string | null;
  newValue: string | null;
}
