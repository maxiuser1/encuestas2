import { v4 as uuid } from 'uuid';

export function getGuid(): string {
  return uuid();
}
