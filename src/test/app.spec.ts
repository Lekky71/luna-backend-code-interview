import request from 'supertest';

import app from '../app';
import { badCreateRequestBody, createRequestBody, updateRequestBody } from './data/requests';
import {
  addMetadataResponse,
  metadataNotFoundResponse,
  tokenExistsErrorResponse,
  updateMetadataResponse
} from './data/responses';
import { Logger } from '../helpers/Logger';

const knex = require('../../data/db');

const metaUrl = '/nft/luna-shoes/metadata';

describe('Testing endpoints', () => {
  it('GET / - Should return 404', async () => {
    await request(app)
      .get('/')
      .expect(404);
  });
});

describe('Testing create metadata', () => {

  it(`POST ${metaUrl} - Should return 400 name missing`, async () => {

    await request(app)
      .post(metaUrl)
      .send(badCreateRequestBody)
      .expect(400);
  });

  it(`POST ${metaUrl} - Should return 200`, async () => {
    await request(app)
      .post(metaUrl)
      .send(createRequestBody)
      .then((res: any) => {
        Logger.Info(res.body);
        expect(res.body).toEqual(addMetadataResponse);
      });
  });

  it(`POST ${metaUrl} - Should return 403 cannot insert into existing token`, async () => {
    await request(app)
      .post(`${metaUrl}/1`)
      .send(createRequestBody)
      .then((res: any) => {
        Logger.Info(res.body);
        expect(res.body).toEqual(tokenExistsErrorResponse);
      });
  });
});

describe('Get all  metadata', () => {

  it(`GET ${metaUrl} - Should return 200`, async () => {
    await request(app)
      .get(metaUrl)
      .then((res: any) => {
        expect(res.body.data[0].name).toEqual('Dave Starbelly');
      });
  });

  it(`GET ${metaUrl}/1 - Should return 200`, async () => {
    await request(app)
      .get(`${metaUrl}/1`)
      .then((res: any) => {
        expect(res.body.data.name).toEqual('Dave Starbelly');
      });
  });
});

describe('Update metadata', () => {

  it(`PUT ${metaUrl}/1 - Should return 200`, async () => {
    await request(app)
      .put(`${metaUrl}/1`)
      .send(updateRequestBody)
      .then((res: any) => {
        Logger.Info(res.body);
        expect(res.body).toEqual(updateMetadataResponse);
      });
  });
});

describe('Delete metadata', () => {

  it(`DELETE ${metaUrl}/100 - Should return 404`, async () => {
    await request(app)
      .delete(`${metaUrl}/100`)
      .then((res: any) => {
        Logger.Info(res.body);
        expect(res.body).toEqual(metadataNotFoundResponse);
      });
  });

  it(`DELETE ${metaUrl}/1 - Should return 200`, async () => {
    await request(app)
      .delete(`${metaUrl}/1`)
      .then((res: any) => {
        Logger.Info(res.body);
        expect(res.body.data.deleted).toEqual(1);
      });
  });

  it(`DELETE ${metaUrl} - Should return 200`, async () => {
    for (let i = 0; i < 6; i++) {
      await request(app)
        .post(metaUrl)
        .send(createRequestBody)
        .then((res: any) => {
          Logger.Info(res.body);
        });
    }
    await request(app)
      .delete(metaUrl)
      .then((res: any) => {
        Logger.Info(res.body);
        expect(res.body.data.deleted).not.toBeNaN();
      });
  });
});

afterAll(async () => {
  await knex.destroy();
});
