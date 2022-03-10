import { Logger } from '../helpers/Logger';
import { GetItemRequest } from '../interfaces/get.item.request';
import { AddMetadataRequest, UpdateMetadataRequest } from '../interfaces/metadata';

export async function addItem(request: AddMetadataRequest): Promise<boolean> {
  Logger.Info(request);
  return true;
}

export async function getAllItems(collectionId: string): Promise<boolean> {
  Logger.Info(collectionId);
  return true;
}

export async function getSingleItem(request: GetItemRequest): Promise<boolean> {
  Logger.Info(request);
  return true;
}

export async function updateItem(request: UpdateMetadataRequest): Promise<boolean> {
  Logger.Info(request);
  return true;
}

export async function deleteItem(request: GetItemRequest): Promise<boolean> {
  Logger.Info(request);
  return true;
}
