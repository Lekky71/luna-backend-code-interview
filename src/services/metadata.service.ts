import { Logger } from '../helpers/Logger';
import { GetItemRequest } from '../interfaces/get.item.request';
import { AddMetadataRequest, Metadata, UpdateMetadataRequest } from '../interfaces/metadata';
import * as knexHelper from '../helpers/knex.helper';
import { getSingleMetadata } from '../helpers/knex.helper';
import { CustomError } from '../helpers';
import { HttpStatus } from '../constants/http.status';

export async function addItem(request: AddMetadataRequest): Promise<number> {
  const count = Number.parseInt((await knexHelper.getCountForCollection(request.collectionId))[0].count);
  Logger.Info(`Add new token with id: ${count + 1} for collection ${request.collectionId}`);
  request.metadata.attributes = JSON.stringify(request.metadata.attributes);
  await knexHelper.insertMetadata({ ...request.metadata, token_id: count + 1, collection_id: request.collectionId });
  return count + 1;
}

export async function getAllItems(collectionId: string): Promise<Metadata[]> {
  Logger.Info(`Getting all metadata for collection: ${collectionId}`);
  const result = await knexHelper.getAllMetadata(collectionId);
  if(result.length === 0) {
    throw new CustomError(HttpStatus.NOT_FOUND, 'Token metadata was not found');
  }
  return result;
}

export async function getSingleItem(request: GetItemRequest): Promise<Metadata> {
  Logger.Info(request);
  const result = await knexHelper.getSingleMetadata(request);
  if(result.length === 0) {
    throw new CustomError(HttpStatus.NOT_FOUND, 'Token metadata was not found');
  }
  return result[0];
}

export async function updateItem(request: UpdateMetadataRequest): Promise<boolean> {
  Logger.Info(request);
  return true;
}

export async function deleteItem(request: GetItemRequest): Promise<boolean> {
  Logger.Info(request);
  return true;
}
