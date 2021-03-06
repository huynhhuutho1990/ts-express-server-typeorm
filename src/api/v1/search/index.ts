import express from 'express';
import { CelebService, VideoService } from '../../../services';
import { SuccessResponse } from '../../../common/api-response';
import RetrieveCelebDto from '../../../database/dto/celeb/retrieveCeleb.dto';

import { convertToDtoPage } from '../../../utils/helpers/paging.helper';
import Paging from '../../../common/paging';
import { Celeb } from '../../../database/entities';
import RetrieveCelebSearchDetailDto from '../../../database/dto/celeb/retrieveCelebSearchDetail.dto';
import { plainToClass } from 'class-transformer';
import { RetrieveVideoDto } from '../../../database/dto';
import logger from '../../../common/logger';

const search = express.Router();

const celebService = new CelebService();
const videoService = new VideoService();

/**
 * @swagger
 * /search:
 *   get:
 *     tags:
 *       - Search
 *     description: Returns list matching celebrities
 *     parameters:
 *       - name: q
 *         in: query
 *         description: The value that will be searched
 *         required: true
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         description: The index page of list items to return, start from 0
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The list matching celebrities
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
 *                   type: object
 *                   properties:
 *                     entries:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/RetrieveCelebSearchDetailDto'
 *                     total:
 *                       type: integer
 */
search.get('/', async (req, res) => {
  const q = req.query.q as string;
  const page = new Number(req.query.page).valueOf();

  logger.info(`Searching for celeb. Query: ${q}, page: ${page}`);

  const result = await celebService.searchForCeleb(q, page);

  const dtoPage = await postProcessing(result);

  return new SuccessResponse(`Search results for: ${q}`, dtoPage).send(res);
});

/**
 * @swagger
 * /search/category/{category_id}:
 *   get:
 *     tags:
 *       - Search
 *     description: Returns list celebrities with the same category
 *     parameters:
 *       - name: category_id
 *         in: path
 *         description: The id of category
 *         required: true
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         description: The index page of list items to return, start from 0
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The list celebrities
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
 *                   type: object
 *                   properties:
 *                     entries:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/RetrieveCelebDto'
 *                     total:
 *                       type: integer
 */
search.get('/category/:id', async (req, res) => {
  const catId = req.params.id;
  const page = new Number(req.query.page).valueOf();

  logger.info(`Searching for celeb by category: ${catId}, page: ${page}`);

  const result = await celebService.getCelebByCategory(catId, page);

  const dtoPage = await postProcessing(result);

  return new SuccessResponse(`Search results for: ${catId}`, dtoPage).send(res);
});

const postProcessing = async (result: Paging<Celeb>): Promise<Paging<RetrieveCelebDto>> => {
  if (result.total === 1) {
    const entry = result.entries[0];
    logger.info(`Search result only include 1 celeb. Fetching more details of them (id: ${entry.id})`);

    const entryDto = new RetrieveCelebSearchDetailDto(entry);
    const [recentVideos, relatedCelebs] = await Promise.all([
      videoService.getRecentVideoByCeleb(entry.id, 5),
      celebService.getRandomCelebByCategory(entry.categories, [entry.id], 5)
    ]);

    entryDto.recent_videos = plainToClass(RetrieveVideoDto, recentVideos);
    entryDto.suggestion = plainToClass(RetrieveCelebDto, relatedCelebs);

    return new Paging<RetrieveCelebDto>([entryDto], result.total);
  }

  return convertToDtoPage(result, RetrieveCelebDto);
};

export default search;
