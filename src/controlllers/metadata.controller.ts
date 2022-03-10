import { Response as ExpressResponse, Request } from 'express';
import * as Response from '../helpers/response.manager';
import { Logger } from '../helpers/Logger';
import * as metadataService from '../services';
import { HttpStatus } from '../constants/http.status';

/**
 * Save new metadata
 *
 * @param req
 * @param res
 */
export async function handleAddMetadata(req: Request, res: ExpressResponse): Promise<void> {
  // tokenId in the case we want to add metadata for a deleted tokenId
  const { collectionId, tokenId } = req.params;
  try {
    const response = await metadataService.addItem({ collectionId, tokenId: Number.parseInt(tokenId), metadata: req.body });

    return Response.success(res, {
      message: 'Successful',
      response: {
        tokenId: response,
      }
    }, HttpStatus.OK);
  } catch (err: any) {
    Logger.Error(err);

    return Response.failure(res, {
      message: err.message || 'Internal Server Error Occurred'
    }, err.code || HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function handleGetAllMetadata(req: Request, res: ExpressResponse): Promise<void> {
  Logger.Info(req.params);
  try {
    const { collectionId } = req.params;
    const response = await metadataService.getAllItems(collectionId);

    return Response.success(res, {
      message: 'Successful',
      response
    }, HttpStatus.OK);
  } catch (err: any) {
    Logger.Error(err);

    return Response.failure(res, {
      message: err.message || 'Internal Server Error Occurred'
    }, err.code || HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function handleGetMetadata(req: Request, res: ExpressResponse): Promise<void> {
  Logger.Info(req.params);
  try {
    const { collectionId, tokenId } = req.params;
    const response = await metadataService.getSingleItem({ collectionId, tokenId });

    return Response.success(res, {
      message: 'Successful',
      response
    }, HttpStatus.OK);
  } catch (err: any) {
    Logger.Error(err);

    return Response.failure(res, {
      message: err.message || 'Internal Server Error Occurred'
    }, err.code || HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function handleUpdateMetadata(req: Request, res: ExpressResponse): Promise<void> {
  Logger.Info(req.params);
  try {
    const { collectionId, tokenId } = req.params;
    await metadataService.updateItem({ collectionId, tokenId, metadata: req.body });

    return Response.success(res, {
      message: 'Successful',
      response: {
        tokenId: Number.parseInt(tokenId),
      }
    }, HttpStatus.OK);
  } catch (err: any) {
    Logger.Error(err);

    return Response.failure(res, {
      message: err.message || 'Internal Server Error Occurred'
    }, err.code || HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function handleDeleteMetadata(req: Request, res: ExpressResponse): Promise<void> {
  Logger.Info(req.params);
  try {
    const { collectionId, tokenId } = req.params;
    const response = await metadataService.deleteItem({ collectionId, tokenId });

    return Response.success(res, {
      message: 'Successful',
      response: { deleted: response }
    }, HttpStatus.OK);
  } catch (err: any) {
    Logger.Error(err);

    return Response.failure(res, {
      message: err.message || 'Internal Server Error Occurred'
    }, err.code || HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
