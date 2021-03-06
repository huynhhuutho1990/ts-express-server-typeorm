import express from 'express';
import authentication from './access/authentication';
import user from './user/user';
import celeb from './celeb';
import explorer from './explorer';
import airtable from './airtable';
import role from './access/role';
import search from './search';
import home from './home';
import admin from './admin';
import booking from './booking';
import video from './video';
import apiDocs from './apiDocs';
import request from './request';
import notification from './notification';

// Constants
import { environment } from '../../config';

const router = express.Router();

if (environment !== 'production') {
  router.use('/api-docs', apiDocs);
}

router.use('/authentication', authentication);

router.use('/explorer', explorer);

router.use('/celeb', celeb);

router.use('/video', video);

/*-------------------------------------------------------------------------*/
// Below all APIs are public APIs protected by api-key
/*-------------------------------------------------------------------------*/

router.use('/user', user);

router.use('/airtable', airtable);

router.use('/role', role);

router.use('/search', search);

router.use('/home', home);

router.use('/booking', booking);

router.use('/admin', admin);

// APIs for confirming booking from web
router.use('/request', request);

router.use('/notification', notification);

export default router;
