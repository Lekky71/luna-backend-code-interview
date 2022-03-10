import { InsertionMetadata, Metadata, UpdateMetadataRequest } from '../interfaces/metadata';
import { Logger } from './Logger';
import { GetItemRequest } from '../interfaces/get.item.request';

const knex = require('../../data/db');

export async function insertMetadata(metadata: InsertionMetadata): Promise<boolean> {
  await knex('nftMetadata').insert(metadata);
  return true;
}

export async function getLastTokenIdForCollection(collectionId: string): Promise<number> {
  const result = (await knex('nftMetadata').select().where({ collection_id: collectionId }).orderBy('token_id', 'desc').limit(1))[0]?.token_id || 0;
  Logger.Info(result);
  return result;
}

export async function getAllMetadata(collectionId: string): Promise<Metadata[]> {
  const result = await knex('nftMetadata').select().where({ collection_id: collectionId });
  result.forEach((item: any) => {
    delete item.id;
    delete item.collection_id;
    delete item.token_id;
    delete item.created_at;
    delete item.updated_at;
  });
  return result as Metadata[];
}

export async function getSingleMetadata(body: GetItemRequest): Promise<Metadata[]> {
  const result = await knex('nftMetadata').select().where({
    collection_id: body.collectionId,
    token_id: body.tokenId
  }).limit(1);
  result.forEach((item: any) => {
    delete item.id;
    delete item.collection_id;
    delete item.token_id;
    delete item.created_at;
    delete item.updated_at;
  });
  return result as Metadata[];
}

export async function updateMetadata(body: UpdateMetadataRequest): Promise<boolean> {
  Logger.Info(body);
  const result = await knex('nftMetadata')
    .where({ collection_id: body.collectionId, token_id: body.tokenId })
    .update(body.metadata);
  Logger.Info(result);
  return true;
}

export async function deleteMetadata(body: GetItemRequest): Promise<number> {
  // Deletes entire collection unless tokenId is specified.
  const condition = { collection_id: body.collectionId };
  if (body.tokenId) {
    // @ts-ignore
    condition.token_id = body.tokenId;
  }
  return await knex('nftMetadata').where(condition).del();
}
