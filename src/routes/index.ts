import express, { NextFunction, Request, Response } from 'express';
import { routeError } from '../handlers';

import nftRoutes from './nft';

const router: express.Router = express.Router();

router.use('/nft', (req: Request, res: Response, next: NextFunction) => {
  // req.body = JSON.parse((req.body));
  next();
}, nftRoutes);

router.use('/health', (req, res) => {
  res.send({ status: 'OK' });
});

router.use(routeError);

export default router;
