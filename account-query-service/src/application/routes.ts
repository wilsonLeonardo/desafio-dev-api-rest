import { Router } from 'express';
import routerV1 from './v1/routerV1';

const routes = Router();

routes.use('/account/v1/query', routerV1);

export default routes;
