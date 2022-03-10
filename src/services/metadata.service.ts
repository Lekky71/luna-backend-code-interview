import { Logger } from '../helpers/Logger';

export async function addItems(body: any): Promise<boolean> {
  Logger.Info(body);
  return true;
}
