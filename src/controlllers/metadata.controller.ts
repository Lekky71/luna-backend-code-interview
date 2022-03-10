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
  Logger.Info(req.body);
  try {
    const response = await metadataService.addItems(req.body);

    return Response.success(res, {
      message: 'Successful',
      response
    }, HttpStatus.OK);
  } catch (err) {
    Logger.Error(err);

    return Response.failure(res, {
      message: 'Internal Server Error Occurred'
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
