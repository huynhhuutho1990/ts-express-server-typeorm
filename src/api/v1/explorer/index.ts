import express, { Request, Response } from 'express';

import ExplorerGroupController from './group/controller';
import { RetrieveExplorerGroupDto } from '../../../database/dto';
import { ExplorerGroupService, ExplorerCelebrityService, ExplorerCategoryService } from '../../../services';

import { SuccessResponse } from '../../../common/api-response';

const router = express.Router();
const explorerGroupService = new ExplorerGroupService();
const explorerCelebService = new ExplorerCelebrityService();
const explorerCategoryService = new ExplorerCategoryService();

/**
 * @swagger
 * /explorer:
 *   get:
 *     tags:
 *       - Explorer Screen
 *     description: Returns list elements of the Explorer Screen
 *     responses:
 *       200:
 *         description: The list elements of the Explorer Screen
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: string
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RetrieveExplorerGroupDto'
 */
router.get('/', async (req: Request, res: Response) => {
  const explorerGroupController = new ExplorerGroupController(
    explorerGroupService,
    explorerCelebService,
    explorerCategoryService
  );
  const retrieveHomeGroupDtos: RetrieveExplorerGroupDto[] = await explorerGroupController.getAll();

  new SuccessResponse('Get Data Successfully', retrieveHomeGroupDtos).send(res);
});

export default router;
