import { InsertionMetadata, Metadata } from '../interfaces/metadata';
import { Logger } from './Logger';
import { GetItemRequest } from '../interfaces/get.item.request';
const knex = require('../../data/db');

export async function insertMetadata(metadata: InsertionMetadata): Promise<boolean> {
  await knex('nftMetadata').insert(metadata);
  return true;
}

export async function getCountForCollection(collectionId: string) {
  const result = await knex('nftMetadata').count().where({ collection_id: collectionId});
  Logger.Info(result);
  return result;
}

export async function getAllMetadata(collectionId: string) {
  const result = await knex('nftMetadata').select().where({ collection_id: collectionId});
  result.forEach((item: any) => {
    delete item.collection_id;
    delete item.token_id;
    delete item.created_at;
    delete item.updated_at;
  });
  return result as Metadata[];
}

export async function getSingleMetadata(body: GetItemRequest) {
  const result = await knex('nftMetadata').select().where({ collection_id: body.collectionId, token_id: body.tokenId}).limit(1);
  result.forEach((item: any) => {
    delete item.collection_id;
    delete item.token_id;
    delete item.created_at;
    delete item.updated_at;
  });
  return result as Metadata[];
}
