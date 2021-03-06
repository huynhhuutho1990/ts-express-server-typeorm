import express from 'express';
import MiddlewareOR from '../../../middlewares/middlewareOR';
import CheckRole from '../../../middlewares/checkRole';
import { ROLES } from '../../../utils/constants';

import category from './category';
import celeb from './celeb';
import home from './home';
import explorer from './explorer';

const router = express.Router();
// secure all endpoints in this router with role ADMIN or SUPER_ADMIN
router.use(MiddlewareOR(CheckRole(ROLES.ADMIN), CheckRole(ROLES.SUPER_ADMIN)));

router.use('/category', category);
router.use('/celeb', celeb);
router.use('/home', home);
router.use('/explorer', explorer);

export default router;
