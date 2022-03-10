import { Logger } from '../helpers/Logger';
import { GetItemRequest } from '../interfaces/get.item.request';
import { AddMetadataRequest, Metadata, UpdateMetadataRequest } from '../interfaces/metadata';
import * as knexHelper from '../helpers/knex.helper';
import { CustomError } from '../helpers';
import { HttpStatus } from '../constants/http.status';

const mustDeleteError = 'Token must have been deleted before you can insert';

export async function addItem(request: AddMetadataRequest): Promise<number> {
  const count = await knexHelper.getLastTokenIdForCollection(request.collectionId);

  // Insert for particular token
  if (request.tokenId) {
    if (request.tokenId > count) {
      throw new CustomError(HttpStatus.FORBIDDEN, mustDeleteError);
    }
    const result = await knexHelper.getSingleMetadata({
      collectionId: request.collectionId,
      tokenId: request.tokenId.toString()
    });

    if (result.length !== 0) {
      throw new CustomError(HttpStatus.FORBIDDEN, mustDeleteError);
    }
  }

  const saveTokenId = request.tokenId || count + 1;
  Logger.Info(`Adding new token metadata with id: ${saveTokenId} for collection ${request.collectionId}`);

  request.metadata.attributes = JSON.stringify(request.metadata.attributes);
  await knexHelper.insertMetadata({ ...request.metadata, token_id: saveTokenId, collection_id: request.collectionId });
  return saveTokenId;
}

export async function getAllItems(collectionId: string): Promise<Metadata[]> {
  Logger.Info(`Getting all metadata for collection: ${collectionId}`);
  const result = await knexHelper.getAllMetadata(collectionId);
  if (result.length === 0) {
    throw new CustomError(HttpStatus.NOT_FOUND, 'Token metadata was not found');
  }
  return result;
}

export async function getSingleItem(request: GetItemRequest): Promise<Metadata> {
  Logger.Info(request);
  const result = await knexHelper.getSingleMetadata(request);
  if (result.length === 0) {
    throw new CustomError(HttpStatus.NOT_FOUND, 'Token metadata was not found');
  }
  return result[0];
}

export async function updateItem(request: UpdateMetadataRequest): Promise<boolean> {
  await getSingleItem({ collectionId: request.collectionId, tokenId: request.tokenId });
  Logger.Info('got here');
  const response = await knexHelper.updateMetadata(request);
  Logger.Info(response);
  return true;
}

export async function deleteItem(request: GetItemRequest): Promise<number> {
  Logger.Info(request);
  const result = await knexHelper.deleteMetadata(request);
  if (result === 0) {
    throw new CustomError(HttpStatus.NOT_FOUND, 'Token metadata was not found');
  }
  Logger.Info(result);
  return result;
}
